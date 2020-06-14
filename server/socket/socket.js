const { io } = require('../server');
const { Users } = require('../classes');

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
      .emit('userJoin', {
        user: 'Admin',
        message: `${user.name} is connected`
      });

    client
      .broadcast
      .emit('allUsers', users.currentPeople());

    callback(null, people);
  });

  client.on('disconnect', () => {
    const user = users.deletePerson(client.id);
    client
      .broadcast
      .emit('createMessage', {
        user: 'Admin',
        message: `${user.name} is disconnected`
      });
    client
      .broadcast
      .emit('allUsers', users.currentPeople());
  });
});

