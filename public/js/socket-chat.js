const socket = io();
const params = new URLSearchParams(window.location.search);

if(!(params.has('name') && params.get('name') !== '') || !(params.has('room') && params.get('room') !== '')) {
  window.location = 'index.html';
  throw new Error('Required name and room');
}

const user = {
  name: params.get('name'),
  room: params.get('room')
};

socket.on('connect', () => {
  console.log('Server connected');
  socket.emit('joinChat', user, (error, resp) => {
    if (error) throw error;
    console.log('People', resp);
  });
});

socket.on('createMessage', msg => console.log(msg));
socket.on('userJoin', msg => console.log(msg));
socket.on('allUsers', users => console.log(users));

// private message
socket.on('privateMessage', message => {
  console.log('Private message:', message);
});

