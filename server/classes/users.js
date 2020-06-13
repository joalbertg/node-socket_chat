class Users {
  constructor(){
    this.people = [];
  }

  addUser = (id, name) => {
    const person = { id, name };

    this.people.push(person);
    return this.people;
  }

  person = id => {
    const person = this.people.filter(person => person.id === id)[0];
    return person;
  }

  currentPeople = () => this.people;
  peoplePerRoom = room => { /**/ };

  deletePerson = id => {
    const person = person(id);

    this.people = this.people.filter(person => person.id != id);
    return true;
  }
}

module.exports = {
  Users
};

