messages = [
  {
    "content": "Hey !",
    "user": 1,
    "channel": 3,
    "date": ""
  },
  {
    "content": "Hey !",
    "user": 1,
    "channel": 1,
    "date": ""
  },
  {
    "content": "How are you ?",
    "user": 2,
    "channel": 1,
    "date": ""
  },
  {
    "content": "I'm tripping !",
    "user": 1,
    "channel": 1,
    "date": ""
  },
  {
    "content": "Aww",
    "user": 2,
    "channel": 1,
    "date": ""
  }
];

class MessageManager {
  constructor() {
  }

  fetchAllMessagesByUser(user) {
    return messages.filter((o) => {
      return o.user == user.id;
    });
  }

  fetchAllMessagesByChannel(channel) {
    return messages.filter((o) => {
      return o.channel == channel.id;
    });
  }
}

module.exports = new MessageManager();
