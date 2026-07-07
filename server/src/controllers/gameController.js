const GameRoom = require('../models/GameRoom');
const User = require('../models/user');
const { QUESTIONS_BANK }= require('../utils/questionBank')
// Generate unique room ID (6 characters - LR69IP style)
const generateRoomId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Helper utility to safely inject `userId` fields into frontend models
const structureFrontendRoom = (roomDoc) => {
  if (!roomDoc) return null;
  const roomObj = roomDoc.toObject();
  roomObj.players = roomObj.players.map(p => ({
    ...p,
    userId: p.user?._id || p.user // Normalizes database population reference mapping
  }));
  return roomObj;
};

// ====================== CREATE ROOM (HTTP) ======================
const createRoom = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const roomId = generateRoomId();

    const gameRoom = new GameRoom({
      roomId,
      status: 'waiting',
      phase: 'waiting',
      pot: 0,
      players: [{
        user: userId,
        username: '', 
        numbers: [],
        chips: 50,
        chipsBetThisRound: 0,
        totalChipsWon: 0,
        isReady: false,
        advantage: false
      }]
    });

    await gameRoom.save();

    // Populate user info
    const populatedRoom = await GameRoom.findById(gameRoom._id)
      .populate('players.user', 'name username');

    // Set fallback username directly
    if (populatedRoom.players[0]?.user) {
      populatedRoom.players[0].username = 
        populatedRoom.players[0].user.username || 
        populatedRoom.players[0].user.name;
      await populatedRoom.save();
    }

    res.status(201).json({
      success: true,
      roomId: populatedRoom.roomId,
      gameState: structureFrontendRoom(populatedRoom),
      message: 'Room created successfully'
    });
  } catch (error) {
    console.error("Create Room Error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to create room" 
    });
  }
};

// ====================== JOIN ROOM (HTTP) ======================
const joinRoom = async (req, res) => {
  try {
    const { roomId, userId } = req.body;

    if (!roomId || !userId) {
      return res.status(400).json({
        success: false,
        message: "Room ID and User ID are required"
      });
    }

    const normalizedRoomId = roomId.toUpperCase();

    let room = await GameRoom.findOne({
      roomId: normalizedRoomId
    }).populate("players.user", "name username");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    const userIdString = String(userId);

    // Remove any accidental duplicates already stored
    room.players = room.players.filter(
      (player, index, self) =>
        index ===
        self.findIndex(
          p =>
            String(p.user?._id || p.user) ===
            String(player.user?._id || player.user)
        )
    );

    // Check if user already exists
    const existingPlayer = room.players.find(
      player =>
        String(player.user?._id || player.user) === userIdString
    );

    if (existingPlayer) {
      await room.save();

      return res.status(200).json({
        success: true,
        message: "Already inside room",
        gameState: structureFrontendRoom(room)
      });
    }

    // Strict 2-player room
    if (room.players.length >= 2) {
      return res.status(400).json({
        success: false,
        message: "Room is full"
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    room.players.push({
      user: user._id,
      username: user.username || user.name,
      numbers: [],
      chips: 50,
      chipsBetThisRound: 0,
      totalChipsWon: 0,
      isReady: false,
      advantage: false
    });

    await room.save();

    const updatedRoom = await GameRoom.findOne({
      roomId: normalizedRoomId
    }).populate("players.user", "name username");

    return res.status(200).json({
      success: true,
      message: "Player joined successfully",
      gameState: structureFrontendRoom(updatedRoom)
    });

  } catch (error) {
    console.error("Join Room Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ====================== CHECK AVAILABILITY (HTTP ADDITION) ======================
const checkRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await GameRoom.findOne({ roomId: roomId.toUpperCase() });

    if (!room) {
      return res.status(404).json({ success: false, available: false, message: 'Room code does not exist' });
    }

    if (room.players.length >= 2) {
      return res.status(200).json({ success: true, available: false, message: 'Room is full' });
    }

    res.status(200).json({ success: true, available: true, message: 'Room is open' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ====================== GET GAME STATE (HTTP REFRESHES) ======================
const getGameState = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await GameRoom.findOne({ roomId: roomId.toUpperCase() })
      .populate('players.user', 'name username chips');

    if (!room) return res.status(404).json({ success: false, message: 'Room not found' });

    res.status(200).json({
      success: true,
      gameState: structureFrontendRoom(room)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getQuestionBank = async (req, res) => {
  try {
    // Transform the object into an array with keys injected as 'id'
    const questionsList = Object.entries(QUESTIONS_BANK).map(([id, config]) => ({
      id,
      text: config.text,
      category: config.category,
    }));
    
    return res.status(200).json({
      success: true,
      data: questionsList
    });
  } catch (error) {
    console.error("Error fetching question bank:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to retrieve the question bank." 
    });
  }
};

module.exports = {
  createRoom,
  joinRoom,
  checkRoomAvailability,
  getGameState,
  getQuestionBank
};