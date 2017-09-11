messages = [
  {
    "content": "Hey !",
    "user": 1,
    "channel": 3,
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
