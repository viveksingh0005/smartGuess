
const gameSocket = require('./src/sockets/gameSocket');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

const app = require("./src/app");

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173",
            "https://smart-guess.vercel.app"
        ],
         
        methods: ["GET", "POST"],
         credentials: true,
    }
});



// Initialize socket events
gameSocket(io);

// Connect MongoDB and start server
const PORT = process.env.PORT ;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    server.listen(PORT, () => {
        console.log(`Server Running on Port ${PORT}`);
    });
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});