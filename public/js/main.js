const socket = io();

socket.on('connect', () => {
  console.log('Server connect!!!');
});

socket.on('disconnect', () => {
  console.log('Lost connection');
});

// send info
socket.emit('sendMessage', {
  user: 'Jolabert',
  message: 'Hello World!'
});

socket.on('sendMessage', message => console.log(message));

