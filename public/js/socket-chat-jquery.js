const params = new URLSearchParams(window.location.search);

const name = params.get('name');
const room = params.get('room');

const divUsuarios = document.getElementById('divUsuarios');
const formSend = document.getElementById('formSend');
const divChatbox = document.getElementById('divChatbox');

const renderToUsers = users => { // [{}, {}, {}]
  const liHead = document.createElement('li');
  let html = `
    <a href="javascript:void(0)" class="active">Chat de <span>${room}</span>
    </a>`;

  liHead.innerHTML = html;
  divUsuarios.innerHTML = '';
  divUsuarios.append(liHead);

  for(let i = 0; i < users.length; i++) {
    const li = document.createElement('li');
    const anchor = `
      <a data-id="${users[i].id}" href="javascript:void(0)">
        <img src="assets/images/users/1.jpg" alt="user-img" class="img-circle">
        <span>
          ${users[i].name}<small class="text-success">online</small>
        </span>
      </a>`;
    li.innerHTML = anchor;
    setEvent(li);
    divUsuarios.append(li);
  }
}

const time = date => {
  const currentDate = new Date(date);
  return `${currentDate.getHours()}:${currentDate.getMinutes()}`;
}

const renderToMessages = data => {
  const li = document.createElement('li');
  let defaultClass = 'info';
  li.setAttribute('class', 'animated fadeIn');

  if(data.name != 'Admin') {
    html = `
      <div class="chat-img">
        <img src="assets/images/users/1.jpg" alt="${data.name}" />
      </div>`;
  } else {
    defaultClass = 'danger';
    html = '';
  }

  html += `
    <div class="chat-content">
      <h5>${data.name}</h5>
      <div class="box bg-light-${defaultClass}">
        ${data.message}
      </div>
    </div>
    <div class="chat-time">
      ${time(data.date)}
    </div>`;

  li.innerHTML = html;
  divChatbox.append(li);
}

const renderMyMessage = data => {
  const li = document.createElement('li');
  li.setAttribute('class', 'animated fadeIn');
  li.setAttribute('class', 'reverse');
  const html = `
    <div class="chat-content">
      <h5>${data.name}</h5>
      <div class="box bg-light-inverse">
        ${data.message}
      </div>
    </div>
    <div class="chat-img">
      <img src="assets/images/users/5.jpg" alt="${data.name}" />
    </div>
    <div class="chat-time">
      ${time(data.date)}
    </div>`;
  li.innerHTML = html;
  divChatbox.append(li);
}

// Listeners
const setEvent = li => {
  li.addEventListener('click', event => {
    const id = event.currentTarget.firstElementChild.getAttribute;
  });
}

const scrollBottom = () => {
  // selectors
  const divChatbox = $('#divChatbox');
  const newMessage = divChatbox.children('li:last-child');

  // heights
  const clientHeight = divChatbox.prop('clientHeight');
  const scrollTop = divChatbox.prop('scrollTop');
  const scrollHeight = divChatbox.prop('scrollHeight');
  const newMessageHeight = newMessage.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    divChatbox.scrollTop(scrollHeight);
  }
}

formSend.addEventListener('submit', event => {
  event.preventDefault();

  const txtMessage = document.getElementById('txtMessage');
  if(txtMessage.value.trim().length !== 0) {
    socket.emit('createMessage', {
      name: name,
      message: txtMessage.value
    }, (error, resp) => {
      if (error) throw error;
      txtMessage.value = '';
      txtMessage.focus();
      renderMyMessage(resp);
      scrollBottom();
    });
  }
});

