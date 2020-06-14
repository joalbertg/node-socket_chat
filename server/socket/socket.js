const { io } = require('../server');
const { Users } = require('../classes');

const { createMessage } = require('../helpers');

const users = new Users();

io.on('connection', client => {
  client.on('joinChat', (data, callback) => {
    if (!data.name || !data.room) {
      return callback({
        error: true,
        message: 'Requiered name/room'
      });
    }

    client.join(data.room);

    const people = users.addUser(client.id, data.name, data.room);

    client
      .broadcast
      .to(data.room)
      .emit('userJoin', createMessage('Admin', `${data.name} is connected`));

    client
      .broadcast
      .to(data.room)
      .emit('allUsers', users.peoplePerRoom(data.room));

    callback(null, people);
  });

  client.on('createMessage', data => {
    const user = users.person(client.id);
    const message = createMessage(user.name, data.message);
    client
      .broadcast
      .to(user.room)
      .emit('createMessage', message);
  });

  client.on('disconnect', () => {
    const user = users.deletePerson(client.id);

    if (user) {
      client
        .broadcast
        .to(user.room)
        .emit('createMessage', createMessage('Admin', `${user.name} is disconnected`));
      client
        .broadcast
        .to(user.room)
        .emit('allUsers', users.peoplePerRoom(user.room));
    }
  });

  // private message
  client.on('privateMessage', data => {
    const user = users.person(client.id);

    client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));
  });
});

