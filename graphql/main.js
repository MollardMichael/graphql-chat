const graphqlHTTP = require('express-graphql');
const UserManager = require('../services/UserManager.js');
const ChannelManager = require('../services/ChannelManager.js');
const MessageManager = require('../services/MessageManager.js');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

console.log(UserManager.fetchAllUsers());

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'A user informations',
  fields: () => ({
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    id: {type: GraphQLString},
    username: {type: GraphQLString},
    messages: {
      type: new GraphQLList(Message),
      resolve: MessageManager.fetchAllMessagesByUser
    }
  })
});

const Channel = new GraphQLObjectType({
  name: "Channel",
  description: "A channel that can be used to exchange messages",
  fields: () => ({
    name: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType)
    },
    messages: {
      type: new GraphQLList(Message),
      resolve: MessageManager.fetchAllMessagesByChannel
    }
  })
});

const Message = new GraphQLObjectType({
  name: 'Message',
  description: 'A message',
  fields: () => ({
    content: {type: GraphQLString},
    user: {type: UserType},
    channel: {type: Channel},
    date: {type: GraphQLString}
  })
});

const QueryType = new GraphQLObjectType({
      name: 'Query',
      description: 'The root of all queries',
      fields: () => ({
        me: {
          type: UserType,
          description: "The user personnal informations",
          resolve: UserManager.fetchCurrentUser
        },
        users: {
          type: new GraphQLList(UserType),
          description: "All users informations",
          resolve: UserManager.fetchAllUsers
        },
        messagesInChannel: {
          type: new GraphQLList(Message),
          args: {
            channel: {
              type: new GraphQLNonNull(GraphQLID)
            }
          },
          resolve: (parent, {channel}) => MessageManager.fetchAllMessagesByChannel({'id': channel})
        }
      })
});


exports.default = graphqlHTTP({
  schema: new GraphQLSchema({
    query: QueryType,
  }),
  graphiql: true,
});
