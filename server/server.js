const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const path = require('path');


const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.static(publicPath));

// this ithe backend communication
module.exports.io = socketIO(server);
require('./socket/socket');

server.listen(port, err => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});

