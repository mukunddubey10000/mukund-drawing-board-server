const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const isDev = app.settings.env === "development";
const URL = isDev
    ? "http://localhost:3000"
    : "https://mukund-drawing-board.vercel.app";

// Configure CORS for HTTP requests
app.use(cors({
    origin: URL, // Allow the correct origin
    methods: ["GET", "POST"], // Allow GET and POST methods
    credentials: true, // Allow cookies and credentials
}));

const httpServer = createServer(app);

// Configure CORS for Socket.IO
const io = new Server(httpServer, {
    cors: {
        origin: URL, // Allow the correct origin
        methods: ["GET", "POST"], // Allow GET and POST methods
        credentials: true, // Allow credentials
    },
});

// Handle Socket.IO events
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("beginPath", (arg) => {
        socket.broadcast.emit("beginPath", arg); // Broadcast to all other clients
    });

    socket.on("drawLine", (arg) => {
        socket.broadcast.emit("drawLine", arg); // Broadcast to all other clients
    });

    socket.on("changeConfig", (args) => {
        socket.broadcast.emit("changeConfig", args); // Broadcast to all other clients
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// Start the server
httpServer.listen(5000, () => {
    console.log(`Server is running on port 5000`);
});
