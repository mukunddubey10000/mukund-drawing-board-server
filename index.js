const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });

io.on("connection", (socket) => {
    console.log('server is connected now ');

    //when user has mouse down then send that to server => socket.on
    //& emit it to others => broadcast.emit
    socket.on("beginPath", (arg) => {
        // console.log('Mukund logger 1 = ', arg);
        socket.broadcast.emit("beginPath", arg);
    });

    socket.on("drawLine", (arg) => {
        // console.log('Mukund logger 2 = ', arg);
        socket.broadcast.emit("drawLine", arg);
    });

    socket.on("changeConfig", (args) => {
        // console.log('Mukund logger 3 = ', args);
        socket.broadcast.emit("changeConfig", args);
    });
});

httpServer.listen(5000);

// idhar se liya https://socket.io/docs/v4/server-initialization/