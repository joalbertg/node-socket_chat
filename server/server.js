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
const io = socketIO(server);

io.on('connection', client => {
  console.log('User connected');

  client.emit('sendMessage', {
    user: 'Admin',
    message: 'Welcome to this application'
  });

  client.on('disconnect', () => {
    console.log('Client disconnected');
  });

  client.on('sendMessage', message => {
    console.log(message);
  });
});

server.listen(port, err => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});

