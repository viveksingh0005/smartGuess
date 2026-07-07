const GameRoom = require("../models/GameRoom");
const User = require("../models/user");
const { QUESTIONS_BANK } = require("../utils/questionBank");
const gameSocket = (io) => {
  io.on("connection", (socket) => {
    let currentRoomId = null;
    let currentUserId = null;


    const cleanRoomId = (id) => (id ? id.toString().trim().toUpperCase() : "");


    socket.on("joinRoom", async ({ roomId, userId }) => {
      try {
        if (!roomId || !userId) return;

        const normalizedRoomId = roomId.toString().trim().toUpperCase();
        socket.join(normalizedRoomId);

        // Fetch the raw document right after the HTTP endpoint updated it
        const room = await GameRoom.findOne({
          roomId: normalizedRoomId,
        }).populate("players.user", "name username chips avatar");

        if (!room) {
          socket.emit("error", { message: "Room not found" });
          return;
        }

        const serializedRoom = room.toObject();
        serializedRoom.players = serializedRoom.players.map((p) => ({
          ...p,
          userId: p.user?._id ? p.user._id.toString() : p.user?.toString(),
        }));

        // Broadcast the full updated layout array back to everyone
        io.to(normalizedRoomId).emit("roomUpdated", serializedRoom);
      } catch (error) {
        console.error("❌ Socket Error:", error);
      }
    });

    socket.on("guessSeries", async ({ roomId, userId, guess }) => {
      const room = await GameRoom.findOne({ roomId });
      if (!room) return;

      const opponent = room.players.find(
        (player) => player.user.toString() !== userId.toString()
      );
      if (!opponent) return;

      const opponentSeries = [...opponent.numbers].sort((a, b) => a - b);
      const guessedSeries = [...guess].sort((a, b) => a - b);
      const isCorrect =
        JSON.stringify(opponentSeries) === JSON.stringify(guessedSeries);

      if (isCorrect) {
        room.status = "won";
        room.winner = userId;
        await room.save();

        const updatedRoom = await GameRoom.findOne({ roomId })
          .populate("players.user", "username");

        io.to(roomId).emit("guessResult", {
          correct: true,
          winnerId: userId,
          gameState: updatedRoom,  // ✅ full data
        });

      }
      else {
        // ✅ Update FIRST, then emit
        room.guess = "not_correct";
        room.status = "betting";
        room.phase = "betting";
        room.currentAdvantagePlayer = null;

        room.players.forEach(player => {
          player.chipsBetThisRound = 0;
          player.advantage = false;
        });

        await room.save();

        const updatedRoom = await GameRoom.findOne({ roomId })
          .populate("players.user", "username");

        io.to(roomId).emit("guessResult", {
          correct: false,
          guessedBy: userId,
          gameState: updatedRoom,
        });

        // After 4 seconds, clear the guess
        setTimeout(async () => {
          try {
            const room = await GameRoom.findOne({ roomId });

            if (!room) return;

            room.guess = "not_any"; // or "any" if that's your desired value

            await room.save();

            const refreshedRoom = await GameRoom.findOne({ roomId })
              .populate("players.user", "username");

            io.to(roomId).emit("gameStateUpdate", refreshedRoom);
          } catch (err) {
            console.error(err);
          }
        }, 20000);
      }
    });


    socket.on("getGameState", async (roomId) => {
      try {
        const room = await GameRoom.findOne({
          roomId,
        }).populate("players.user", "name username chips avatar");

        if (!room) {
          return;
        }


        console.log("JOIN ROOM EMITTED");

        socket.emit("gameState", room);
      }
      catch (error) {
        console.error("getGameState error:", error);
      }
    });


    socket.on("gameStateUpdated", (room) => {
      setGameState(room);
    });

    socket.on("playerReady", async ({ roomId, userId }) => {
      const room = await GameRoom.findOne({ roomId });

      if (!room) return;

      const player = room.players.find((p) => p.user.toString() === userId);

      if (!player) return;

      player.isReady = true;

      await room.save();

      io.to(roomId).emit("roomUpdated", room);

      const bothReady =
        room.players.length === 2 && room.players.every((p) => p.isReady);

      if (!bothReady) return;

      room.phase = "countdown";
      room.countdownStarted = true;
      room.countdownEndsAt = new Date(Date.now() + 10000);

      await room.save();

      io.to(roomId).emit("countdownStarted", {
        endsAt: room.countdownEndsAt,
      });

      setTimeout(async () => {
        const updatedRoom = await GameRoom.findOne({ roomId });

        if (!updatedRoom) return;

        updatedRoom.phase = "number_selection";
        updatedRoom.isGameStarted = true;
        updatedRoom.countdownStarted = false;

        await updatedRoom.save();

        io.to(roomId).emit("gameStarted", updatedRoom);
      }, 10000);
    });
    // ====================== SUBMIT NUMBERS ======================
    // ====================== SUBMIT NUMBERS ======================
    socket.on("submitNumbers", async ({ roomId, userId, numbers }) => {
      try {
        const targetRoomId = cleanRoomId(roomId);
        const sortedNumbers = [...numbers].sort((a, b) => a - b);

        // 1. Update ALL instances of this player in the array (fixes duplicate entries bug)
        // Also updated options to remove the Mongoose deprecation warning
        const updatedRoom = await GameRoom.findOneAndUpdate(
          {
            roomId: targetRoomId,
            "players.user": userId,
          },
          {
            $set: {
              "players.$[elem].numbers": sortedNumbers,
              "players.$[elem].isReady": true,
            },
          },
          {
            arrayFilters: [{ "elem.user": userId }],
            returnDocument: "after", // Replaces deprecated { new: true }
          },
        );

        if (!updatedRoom) {
        }

        // 2. ROBUST READY CHECK: Get all unique user IDs present in the room
        const uniqueUserIds = [
          ...new Set(updatedRoom.players.map((p) => p.user.toString())),
        ];

        // Check if at least 2 unique players are here, and EVERY unique player has at least one 'ready' entry
        const bothSubmitted =
          uniqueUserIds.length >= 2 &&
          uniqueUserIds.every((id) => {
            return updatedRoom.players.some(
              (p) => p.user.toString() === id && p.isReady,
            );
          });

        // 3. Update status if ready
        if (bothSubmitted) {
          // Use findOneAndUpdate to cleanly update the status field without saving stale array copies
          const finalRoom = await GameRoom.findOneAndUpdate(
            { roomId: targetRoomId },
            { $set: { status: "betting" } },
            { returnDocument: "after" },
          ).populate("players.user", "name username chips avatar");

          const normalizedRoom = finalRoom.toObject();
          normalizedRoom.players = normalizedRoom.players.map((p) => ({
            ...p,
            userId: p.user?._id ? p.user._id.toString() : null,
          }));

          io.to(targetRoomId).emit("roomUpdated", {
            ...normalizedRoom,
            bothSubmitted: true,
            phase: "betting",
            status: "betting",
          });
        } else {
          // Still waiting on other players
          const populatedRoom = await GameRoom.findOne({
            roomId: targetRoomId,
          }).populate("players.user", "name username chips avatar");

          const normalizedRoom = populatedRoom.toObject();
          normalizedRoom.players = normalizedRoom.players.map((p) => ({
            ...p,
            userId: p.user?._id ? p.user._id.toString() : null,
          }));

          io.to(targetRoomId).emit("roomUpdated", {
            ...normalizedRoom,
            bothSubmitted: false,
            phase: "selecting",
          });
        }
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // ====================== PLACE BET ======================
    socket.on("placeBet", async ({ roomId, userId, betAmount }) => {
      try {
        const targetRoomId = cleanRoomId(roomId);
        const room = await GameRoom.findOne({ roomId: targetRoomId });
        if (!room || room.status !== "betting") return;

        const playerIndex = room.players.findIndex(
          (p) => p.user.toString() === userId,
        );

        if (playerIndex === -1) {
          socket.emit("error", {
            message: "Player not found",
          });
          return;
        }

        const player = room.players[playerIndex];

        if (player.chips < betAmount) {
          socket.emit("error", {
            message: "Insufficient chips",
          });
          return;
        }

        // Deduct chips
        player.chips -= Number(betAmount);

        // Store bet amount
        player.chipsBetThisRound = Number(betAmount);

        // Add to pot
        room.totalPot += Number(betAmount);

        // Force mongoose to detect nested changes
        room.markModified("players");

        await room.save();

        // Verify saved value
        const verifyRoom = await GameRoom.findById(room._id);

        const updatedRoom = await GameRoom.findOne({
          roomId: targetRoomId,
        }).populate("players.user", "name username chips avatar");

        const normalizedRoom = updatedRoom.toObject();
        normalizedRoom.players = normalizedRoom.players.map((p) => ({
          ...p,
          userId: p.user?._id,
        }));

        io.to(targetRoomId).emit("roomUpdated", normalizedRoom);

        // Check if both players have placed bets
        const bothBet = room.players.every((p) => p.chipsBetThisRound > 0);

        if (bothBet) {

          const bet1 = room.players[0].chipsBetThisRound;
          const bet2 = room.players[1].chipsBetThisRound;

          if (bet1 === bet2) {
            // 🔁 Tie condition — dono ko wapas bet karne do
            room.players.forEach((p) => {
              p.chipsBetThisRound = 0; // reset bets
            });
            room.totalPot = 0; // pot bhi reset (chips already deduct ho chuke hain, wapas add karna hoga agar refund chahiye)

            

            room.markModified("players");
            await room.save();

            const refreshedRoom = await GameRoom.findOne({ roomId: targetRoomId })
              .populate("players.user", "name username chips avatar");

            const normalized = refreshedRoom.toObject();
            normalized.players = normalized.players.map((p) => ({
              ...p,
              userId: p.user?._id,
            }));

            io.to(targetRoomId).emit("betTie", { room: normalized });
            return; // yahin ruk jao, advantage/questions wala code neeche mat chalao
          }

          // ... existing bet1 > bet2 / bet2 > bet1 logic same rahega

        

          let advantagePlayerId;

          if (bet1 > bet2) {
            advantagePlayerId = room.players[0].user;
          } else if (bet2 > bet1) {
            advantagePlayerId = room.players[1].user;
          } else {
            advantagePlayerId =
              room.players[Math.floor(Math.random() * 2)].user;
          }

          room.currentAdvantagePlayer = advantagePlayerId;
          room.status = "decision";

          await room.save();

          normalizedRoom.currentAdvantagePlayer = advantagePlayerId;

          normalizedRoom.status = "decision";

          // Send room update
          io.to(targetRoomId).emit("bettingComplete", {
            advantagePlayer: advantagePlayerId,
            room: normalizedRoom,
          });

          // Create question list
          const questionChoices = Object.entries(QUESTIONS_BANK).map(
            ([key, value]) => ({
              key,
              text: value.text,
              category: value.category,
            }),
          );

          // Send questions
          io.to(targetRoomId).emit("showQuestionChoices", {
            playerId: advantagePlayerId,
            questions: questionChoices,
          });
        }
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // ====================== ASK QUESTION / HINT ======================
    socket.on("askQuestion", async ({ roomId, questionKey, userId }) => {
      try {
        const room = await GameRoom.findOne({ roomId });
        if (!room) return;

        if (room.hintUsed) {
          socket.emit("error", { message: "Hint already used this round" });
          return;
        }

        const opponent = room.players.find(
          (player) => player.user.toString() !== userId.toString()
        );
        if (!opponent) return;

        const question = QUESTIONS_BANK[questionKey];
        if (!question) return;

        const answer = question.resolve(opponent.numbers);

        room.hintUsed = true;
        await room.save();

        // ✅ Send answer to winner
        socket.emit("questionAnswered", {
          questionKey,
          questionText: question.text,
          answer,
        });

        // ✅ After 5 seconds reset to betting
        setTimeout(async () => {
          const freshRoom = await GameRoom.findOne({ roomId });
          if (!freshRoom) return;

          freshRoom.status = "betting";
          freshRoom.phase = "betting";
          freshRoom.currentAdvantagePlayer = null;
          freshRoom.hintUsed = false; // ✅ reset so next round hints work

          freshRoom.players.forEach((player) => {
            player.chipsBetThisRound = 0;
            player.advantage = false;
          });

          await freshRoom.save();

          // ✅ Populate before emitting
          const populatedRoom = await GameRoom.findOne({ roomId })
            .populate("players.user", "username");

          io.to(roomId).emit("roomUpdated", populatedRoom); // ✅ everyone gets fresh state
        }, 5000);

      } catch (error) {
        console.error("askQuestion error:", error);
      }
    });

    // ====================== ANSWER QUESTION ======================
    socket.on("answerQuestion", async ({ roomId, userId, answer }) => {
      try {
        const targetRoomId = cleanRoomId(roomId);
        const room = await GameRoom.findOne({ roomId: targetRoomId });
        if (!room) return;

        const updatedRoom = await GameRoom.findOne({
          roomId: targetRoomId,
        }).populate("players.user", "name username chips avatar");

        const normalizedRoom = updatedRoom.toObject();
        normalizedRoom.players = normalizedRoom.players.map((p) => ({
          ...p,
          userId: p.user?._id,
        }));

        io.to(targetRoomId).emit("questionAnswered", {
          answer,
          answeredBy: userId,
          room: normalizedRoom,
        });

        // Reset for next round
        if (room.currentRound < room.maxRounds) {
          room.currentRound += 1;
          room.status = "betting";
          room.players.forEach((p) => {
            p.chipsBetThisRound = 0;
            p.advantage = false;
          });
          room.currentAdvantagePlayer = null;
          room.currentQuestion = null;
          await room.save();

          const advancedRoom = await GameRoom.findOne({
            roomId: targetRoomId,
          }).populate("players.user", "name username chips avatar");
          const finalRoom = advancedRoom.toObject();
          finalRoom.players = finalRoom.players.map((p) => ({
            ...p,
            userId: p.user?._id,
          }));

          io.to(targetRoomId).emit("nextRound", finalRoom);
        } else {
          room.status = "finished";
          await room.save();
          io.to(targetRoomId).emit("gameFinished", normalizedRoom);
        }
      } catch (error) {
        socket.emit("error", { message: error.message });
      }
    });

    // ====================== DISCONNECT ======================
    socket.on("disconnect", async () => {
      if (currentRoomId) {
        const room = await GameRoom.findOne({ roomId: currentRoomId });
        if (room && room.status !== "finished") {
          io.to(currentRoomId).emit("playerLeft", { userId: currentUserId });
        }
      }
    });
  });
};

module.exports = gameSocket;
