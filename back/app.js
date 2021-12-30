const express = require("express");
const http = require('http')
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const httpServer = http.createServer(app);
const io = socketIo(http);

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi');
});

module.exports = app;
