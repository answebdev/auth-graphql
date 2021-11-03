const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID } = graphql;
const UserType = require('./user_type');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // We need to have a filed here when we are first creating our queries/mutations (it can't be empty)
    // so we can just add in a dummy field for now, until we add something in later:
    // dummyField: { type: GraphQLID },

    // Logic to check authentication status.
    // So, if a user is logged in, we will know that the user is logged in (authenticated).
    // If a user is not logged in and we try to query the user, we get 'null' because the user is not authenticated.
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});

module.exports = RootQueryType;
