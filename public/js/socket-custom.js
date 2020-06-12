const socket = io();

const body = document.querySelector('body');

const write = message => {
  const p = document.createElement('p');
  p.textContent = message;
  body.append(p);
}

const printToDevices = msg => {
  console.log(msg);
  write(msg);
};

socket.on('connect', () => printToDevices('Server connect!!!'));
socket.on('disconnect', () => printToDevices('Lost connection'));

// send info
socket.emit('sendMessage', {
  user: window.clientInformation.appVersion,
  message: 'Hello World!'
}, resp => {
  printToDevices('Callback dispatch');
  printToDevices(resp.message);
});

socket.on('sendMessage', resp => {
  printToDevices(`user: ${resp.user} msg: ${resp.message}`);
});

