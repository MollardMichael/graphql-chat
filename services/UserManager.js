users = [
  {
    "firstName": "John",
    "lastName": "Doe",
    "id": 1,
    "email": "johndoe@gmail.com",
    "username": "Jonny"
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
}

module.exports = new UserManager();
