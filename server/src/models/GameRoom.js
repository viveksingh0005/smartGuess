// models/GameRoom.js
const mongoose = require('mongoose');

const GameRoomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
    minlength: 5,
    maxlength: 8
  },

 
  status: {
    type: String,
    enum: ['waiting', 'number_selection', 'betting', 'decision', 'finished','won','tie'],
    default: 'waiting'
  },

  guess:{
    type:String,
    enum: ['not_any','correct','not_correct'],
    default:'not_any'

},

   

  phase: {
    type: String,
    enum: ['waiting', 'number_selection', 'betting', 'decision', 'finished', 'won'],
    default: 'waiting'
  },

  isGameStarted: {
  type: Boolean,
  default: false
},

countdownStarted: {
  type: Boolean,
  default: false
},

countdownEndsAt: {
  type: Date,
  default: null
},
  currentTurn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  players: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      username: { type: String, default: '' },
      numbers: {
        type: [Number],
        default: [],
        validate: {
          validator: function(nums) {
  return nums.length === 0 ||
    (
      nums.length === 8 &&
      nums.every(n => n >= 0 && n <=15) &&
      new Set(nums).size === 8
    );
},
          message: 'Must have exactly 8 unique numbers (0-15)'
        }
      },
      chips: { type: Number, default: 50 },
      chipsBetThisRound: { type: Number, default: 0 },
      totalChipsWon: { type: Number, default: 0 },
      isReady: { type: Boolean, default: false },
      advantage: { type: Boolean, default: false }
    }
  ],

  pot: { type: Number, default: 0 },
  timer: { type: Number, default: 40 },

  hints: [{
    type: { type: String },
    player: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    value: String
  }],

  currentAdvantagePlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },

  winner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true   // ← This automatically handles createdAt & updatedAt
});

// ====================== HELPER METHODS ======================
GameRoomSchema.methods.getPlayer = function(userId) {
  return this.players.find(p => p.user.toString() === userId.toString());
};

GameRoomSchema.methods.getOpponent = function(userId) {
  return this.players.find(p => p.user.toString() !== userId.toString());
};

GameRoomSchema.methods.isFull = function() {
  return this.players.length >= 2;
};

GameRoomSchema.methods.bothPlayersReady = function() {
  return this.players.length === 2 && 
         this.players.every(p => p.isReady && p.numbers.length === 8);
};

// ====================== REMOVE THIS COMPLETELY ======================
// GameRoomSchema.pre('save', function(next) { ... });   ← DELETE THIS

const GameRoom = mongoose.model('GameRoom', GameRoomSchema);
module.exports = GameRoom;