const express = require("express");
const http = require('http')
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(express.json());

let onlineUsers = [];
io.on('connection', (socket) => {
    const requestSocketName = socket.handshake.query.user;

    onlineUsers.push(requestSocketName)
    io.emit('onlineUpdate', onlineUsers)
    io.emit('messageBack', { message: `${requestSocketName} has connected!` });

    socket.on('message', (message) => {
        io.emit('messageBack', message);
    })

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(user => user !== requestSocketName);
        io.emit('onlineUpdate', onlineUsers)
        io.emit('messageBack', { message: `${requestSocketName} has disconnected!` });
    })
})

app.get('/', (req, res) => {
    res.send('hi');
});

module.exports = server;
