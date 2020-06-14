const { io } = require('../server');
const { Users } = require('../classes');

const { createMessage } = require('../helpers');

const users = new Users();

io.on('connection', client => {
  client.on('joinChat', (user, callback) => {
    if (!user.name) {
      return callback({
        error: true,
        message: 'Requiered name'
      });
    }
    const people = users.addUser(client.id, user.name);

    client
      .broadcast
      .emit('userJoin', createMessage('Admin', `${user.name} is connected`));

    client
      .broadcast
      .emit('allUsers', users.currentPeople());

    callback(null, people);
  });

  client.on('createMessage', data => {
    const user = users.person(client.id);
    const message = createMessage(user.name, data.message);
    client.broadcast.emit('createMessage', message);
  });

  client.on('disconnect', () => {
    const user = users.deletePerson(client.id);
    client
      .broadcast
      .emit('createMessage', createMessage('Admin', `${user.name} is disconnected`));
    client
      .broadcast
      .emit('allUsers', users.currentPeople());
  });
});

