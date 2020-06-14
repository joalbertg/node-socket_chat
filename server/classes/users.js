class Users {
  constructor(){
    this.people = [];
  }

  addUser = (id, name, room) => {
    const person = { id, name, room };

    this.people.push(person);
    return this.peoplePerRoom(room);
  }

  person = id => {
    const person = this.people.filter(person => person.id === id)[0];
    return person;
  }

  currentPeople = () => this.people;
  peoplePerRoom = room => {
    return this.people.filter(person => person.room === room);
  };

  deletePerson = id => {
    const person = this.person(id);

    this.people = this.people.filter(person => person.id != id);
    return person;
  }
}

module.exports = {
  Users
};

