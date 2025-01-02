const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });

io.on("connection", (socket) => {
    console.log('server is connected now');
});

httpServer.listen(5000);

// idhar se liya https://socket.io/docs/v4/server-initialization/