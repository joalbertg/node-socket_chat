const params = new URLSearchParams(window.location.search);

const divUsuarios = document.getElementById('divUsuarios');

const renderToUsers = users => { // [{}, {}, {}]
  const liHead = document.createElement('li');
  let html =`
    <a href="javascript:void(0)" class="active">Chat de <span>${params.get('room')}</span>
    </a>`;

  liHead.innerHTML = html;
  divUsuarios.innerHTML = liHead;

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
  //divUsuarios.innerHTML = html;
}

// Listeners
const setEvent = li => {
  li.addEventListener('click', event => {
    console.log(event.currentTarget.firstElementChild);
    const id event.currentTarget.firstElementChild.getAttribute;
  });
}

