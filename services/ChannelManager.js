channels = [
  {
    "id": 1,
    "name": "The Best Channel",
    "users": [1,2,3]
  },
  {
    "id": 2,
    "name": "The Jelly Channel",
    "users": [1,3]
  },
  {
    "id": 3,
    "name": "Todo",
    "users": [1]
  }
];

class ChannelManager {
  constructor() {
  }

  fetchChannel(id) {
    return channels.filter((o) => {
      return o.id == id;
    })[0];
  }


  fetchChannels(userId) {
    return channels.filter((o) => {
      return o.users.indexOf(userId) >= 0;
    });
  }
}

module.exports = new ChannelManager();
