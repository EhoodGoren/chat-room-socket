const express = require("express");
const http = require('http')
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

let onlineUsers = [];
io.on('connection', (socket) => {
    const requestSocketName = socket.handshake.query.user;

    onlineUsers.push({name: requestSocketName, socketId: socket.id});
    io.emit('onlineUpdate', onlineUsers.map(user => user.name));
    io.emit('messageBack', { message: `${requestSocketName} has connected!` });

    socket.on('message', (message) => {
        io.emit('messageBack', message);
    })

    socket.on('privateMessage', ({ name, message, target }) => {
        const targetUser = onlineUsers.find(user => user.name === target);
        if(!targetUser) return socket.emit('noUser')
        const targetUserSocket = targetUser.socketId;
        io.to(targetUserSocket).emit('messageBack', { name, message });
        socket.emit('messageBack', { name, message });
    })

    socket.on('disconnect', () => {
        onlineUsers = onlineUsers.filter(user => user.name !== requestSocketName);
        io.emit('onlineUpdate', onlineUsers.map(user => user.name));
        io.emit('messageBack', { message: `${requestSocketName} has disconnected!` });
    })
})

// app.get('/', (req, res) => {
//     res.send('hi');
// });


module.exports = server;
