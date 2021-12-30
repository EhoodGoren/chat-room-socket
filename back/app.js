const express = require("express");
const io = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi');
});

module.exports = app;
