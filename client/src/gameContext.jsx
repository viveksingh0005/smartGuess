import { createContext, useContext, useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from './auth.context';
const GameContext = createContext();

// Initialize the socket outside or keep it single instance

const socket = io(import.meta.env.VITE_API_URL, {
  withCredentials: true,
});
export const GameProvider = ({ children }) => {
  
  const [hintAnswer, setHintAnswer] = useState(null);
  const [questionChoices, setQuestionChoices] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [tieMessage, setTieMessage] = useState("");
  
  const [isConnected, setIsConnected] = useState(false);
  const { user } = useAuth();
  const myUserId = user?._id;


const clearHintAnswer = () => {
  setHintAnswer(null);
};

  // Safe wrapper to resolve room IDs dynamically from function parameters or local state
  const getActiveRoomId = (paramRoomId) => paramRoomId || roomId;

  const joinRoom = (targetRoomId, userId) => {
    setRoomId(targetRoomId);
    
    socket.emit('joinRoom', { roomId: targetRoomId, userId });
  };

  const playerReady = (roomId, userId) => {
  socket.emit('playerReady', {
    roomId,
    userId
  });
};
  

const submitNumbers = (targetRoomId, numbers) => {
  const rId = getActiveRoomId(targetRoomId);

  socket.emit("submitNumbers", {
    roomId: rId,
    userId: myUserId,
    numbers
  });
};

  // 💡 FIX: Destructured signature to match frontend call: placeBet(roomId, betAmount)
  const placeBet = (targetRoomId, betAmount) => {
    // If the frontend didn't pass roomId first, adjust gracefully
    const finalRoomId = typeof targetRoomId === 'string' ? targetRoomId : roomId;
    const finalAmount = typeof targetRoomId === 'number' ? targetRoomId : betAmount;

    socket.emit('placeBet', { roomId: finalRoomId, userId: myUserId, betAmount: finalAmount });
  };

  // 💡 FIX: Aliased to askHint to match your PlayGame.jsx modal action perfectly
 const askQuestion = (
  targetRoomId,
  questionKey
) => {

  const finalRoomId =
    getActiveRoomId(
      targetRoomId
    );

  socket.emit(
    "askQuestion",
    {
      roomId: finalRoomId,
      userId: myUserId,
      questionKey
    }
  );

};

  
  // Keep guessSeries matching your UI setup
  const guessSeries = (
  targetRoomId,
  guessArray
) => {

  const rId =
    getActiveRoomId(
      targetRoomId
    );


  socket.emit(
    "guessSeries",
    {
      roomId: rId,
      userId: myUserId,
      guess: guessArray
    }
  );
};

  const myPlayer = gameState?.players?.find(
  player => player.user?._id?.toString() === myUserId
);
const opponentPlayer = gameState?.players?.find(
  player => player.user?._id?.toString() !== myUserId
);


  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    
    // Handler to dry up updating game state
   const updateGame = (room) => {
  const newState = room?.room ? room.room : room;
  console.log("🔄 updateGame setting state to:", newState);
  setGameState(newState);
};
 
// socket.on("gameState", (room) => {
//   console.log("gameState fired", room);

//   setGameState(room);

// });



    socket.on(
  "showQuestionChoices",
  (data) => {

    console.log(
      "Questions:",
      data.questions
    );

    setQuestionChoices(
      data.questions
    );

  }
);

socket.on(
  "questionAnswered",
  (data) => {

    setHintAnswer(data);

  }
);
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('gameState',updateGame)
    socket.on('roomUpdated', updateGame);
    socket.on('gameStarted', updateGame);
    socket.on('bettingComplete', updateGame);
    socket.on('questionAsked', updateGame);
    socket.on('nextRound', updateGame);
    socket.on('gameFinished', updateGame);
    
    // Clean up ONLY specific event strings to prevent breaking global socket
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('roomUpdated', updateGame);
      socket.off('gameStarted', updateGame);
      socket.off('bettingComplete', updateGame);
      socket.off('questionAsked', updateGame);
      socket.off('nextRound', updateGame);
      socket.off('gameFinished', updateGame);
      socket.off("showQuestionChoices");
      socket.off("questionAnswered");
    };
  }, []);



useEffect(() => {

  const handleConnect = () => {

    if (roomId) {

      socket.emit(
        "getGameState",
        roomId
      );

    }

  };

  

  socket.on(
    "connect",
    handleConnect
  );

  socket.on(
    "gameStateUpdated",
    (room) => {
      console.log("gameStateUpdated fired", room);
      setGameState(room);

    }
  );




  return () => {

    socket.off(
      "connect",
      handleConnect
    );

    socket.off(
      "gameStateUpdated"
    );

  };

}, [roomId]);

useEffect(() => {
  const handleGuessResult = (data) => {
    console.log("📩 guessResult received:", data);
    setGameState(data.gameState); // status will be "won" or "betting" automatically
  };

  socket.on("guessResult", handleGuessResult);

  return () => {
    socket.off("guessResult", handleGuessResult);
  };
}, []);



useEffect(() => {
  if (!roomId) return;
  
  console.log("🟡 roomId set:", roomId);
  console.log("🟡 socket connected?", socket.connected);

  if (socket.connected) {
    console.log("✅ Emitting getGameState immediately");
    socket.emit("getGameState", roomId);
  } else {
    console.log("⏳ Waiting for socket to connect...");
    socket.once("connect", () => {
      console.log("✅ Socket connected! Now emitting getGameState");
      socket.emit("getGameState", roomId);
    });
  }

}, [roomId]);

useEffect(() => {
  console.log("🔥 GAMESTATE UPDATED:", gameState);
}, [gameState]);

useEffect(() => {
  if (!gameState?.players || gameState.players.length < 2) return;

  const bothBet = gameState.players.every(p => (p.chipsBetThisRound || 0) > 0);
  const stillBetting = gameState.status === "betting";

  // Mimic what a refresh does: re-fetch fresh, fully-populated state
  if (bothBet && stillBetting) {
    console.log("🔁 Both bet but status stale — re-fetching game state");
    socket.emit("getGameState", roomId);
  }
}, [gameState, roomId]);

useEffect(() => {
  if (!roomId || !myUserId) return;   // ⚠️ myUserId का wait करना ज़रूरी है

  const rejoin = () => {
    console.log("🔄 Rejoining room:", roomId, myUserId);
    socket.emit("joinRoom", { roomId, userId: myUserId });
  };

  if (socket.connected) {
    rejoin();
  } else {
    socket.once("connect", rejoin);
  }
}, [roomId, myUserId]);

useEffect(() => {
  const handleBetTie = (data) => {
    setGameState(data.room);
    setTieMessage("Tie in this round! Bet again.");
  };

  socket.on("betTie", handleBetTie);

  return () => socket.off("betTie", handleBetTie);
}, []);

 useEffect(() => {
  if (!tieMessage) return;
  const timer = setTimeout(() => setTieMessage(""), 7000);
  return () => clearTimeout(timer);
}, [tieMessage]);

  return (
    <GameContext.Provider value={{
      socket,
      roomId,
      gameState,
      myUserId,
      isConnected,

      myPlayer,
      opponentPlayer,
      joinRoom,
      playerReady,
      submitNumbers,
      placeBet,
      askQuestion,
      questionChoices,
      hintAnswer,
      guessSeries,  
      clearHintAnswer,
      setRoomId,
      tieMessage,
      
       
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);