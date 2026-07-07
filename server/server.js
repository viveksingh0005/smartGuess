
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
        origin: "http://localhost:5173", // React/Vite frontend
        methods: ["GET", "POST"],
         credentials: true,
    }
});



// Initialize socket events
gameSocket(io);

// Connect MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");

    server.listen(5000, () => {
        console.log("Server Running on Port 5000");
    });
})
.catch((err) => {
    console.error("MongoDB Connection Error:", err);
});