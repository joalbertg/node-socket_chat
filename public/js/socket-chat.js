const socket = io();

const params = new URLSearchParams(window.location.search);

if(!params.has('name')) {
  window.location = 'index.html';
  throw new Error('Required name');
}

const user = {
  name: params.get('name')
};

socket.on('connect', () => {
  console.log('Server connected');
  socket.emit('joinChat', user, (error, resp) => {
    if (error) throw erorr;
    console.log('People', resp);
  });
});

socket.on('createMessage', msg => console.log(msg));
socket.on('userJoin', msg => console.log(msg));
socket.on('allUsers', users => console.log(users));

