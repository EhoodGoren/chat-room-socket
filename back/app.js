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

io.on('connection', (socket) => {
    io.emit('messageBack', { message: `${socket.handshake.query.user} has connected!` });
    console.log('A user has connected');
    socket.on('message', (message) => {
        io.emit('messageBack', message);
    })
    socket.on('disconnect', () => {
        io.emit('messageBack', { message: `${socket.handshake.query.user} has disconnected!` });
    })
})

app.get('/', (req, res) => {
    res.send('hi');
});

module.exports = server;
