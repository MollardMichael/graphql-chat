users = [
  {
    "firstName": "John",
    "lastName": "Doe",
    "id": 1,
    "email": "johndoe@gmail.com",
    "username": "Jonny"
  },
  {
    "firstName": "Jean",
    "lastName": "Dupont",
    "id": 2,
    "email": "jean@gmail.com",
    "username": "JD"
  },
  {
    "firstName": "Laurent",
    "lastName": "Piaf",
    "id": 3,
    "email": "LP@gmail.com",
    "username": "LP"
  }
];

class UserManager {
  constructor() {

  }

  fetchCurrentUser() {
    return users[0];
  }

  fetchAllUsers() {
    return users;
  }

  fetchUserByMessage(message){
    let us = users.filter((o)=> {
      return o.id == message.user;
    })

    if (us.length === 1) {
      return us[0];
    }
  }

  getUserInChannel(channel) {
    return users.filter((o) => channel.users.indexOf(o.id) >= 0);
  }

  registerUser(userInput) {
    userInput.id = Math.floor(Math.random()*1000);
    users.push(userInput);
    return userInput;
  }
}

module.exports = new UserManager();
