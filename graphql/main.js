const graphqlHTTP = require('express-graphql');
const UserManager = require('../services/UserManager.js');
const ChannelManager = require('../services/ChannelManager.js');
const MessageManager = require('../services/MessageManager.js');

const {
  GraphQLInputObjectType,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID
} = require('graphql');

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

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  description: 'A user informations',
  fields: () => ({
    firstName: {type: GraphQLString},
    lastName: {type: GraphQLString},
    email: {type: GraphQLString},
    username: {type: GraphQLString},
  })
});

const Channel = new GraphQLObjectType({
  name: "Channel",
  description: "A channel that can be used to exchange messages",
  fields: () => ({
    name: {type: GraphQLString},
    users: {
      type: new GraphQLList(UserType),
      resolve: UserManager.getUserInChannel
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
    user: {
      type: UserType,
      resolve: UserManager.fetchUserByMessage
    },
    channel: {
      type: Channel,
      resolve: (message) => ChannelManager.fetchChannel(message.channel)
    },
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

const MutationType = new GraphQLObjectType({
      name: 'Mutation',
      description: 'The root of all Mutation',
      fields: () => ({
        registerUser: {
          type: UserType,
          args: {
            user: {
              type: new GraphQLNonNull(UserInputType)
            }
          },
          resolve: (parent, {user}) => UserManager.registerUser(user)
        }
      })
});


exports.default = graphqlHTTP({
  schema: new GraphQLSchema({
    query: QueryType,
    mutation: MutationType
  }),
  graphiql: true,
});
