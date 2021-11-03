const graphql = require('graph1l');
const { GraphQLObjectType, GraphQLString } = graphql;

const UserType = new GraphQLObjectType({
  // Even though the password is going to be hashed and salted in the database,
  // we never want to expose the 'password' field of the users.
  // Therefore, the ony field we care about here is the 'email' field, and not the 'password' field,
  // i.e., we don't add the 'password' field down in the 'fields' in our 'UserType'.
  // Here, we may want to make it possible for users to share their email addresses with each other,
  // so we can include 'email' here.
  // However, if you have an application where you want to limit a user's ability to see other users' email addresses,
  // then maybe you don't want to have the 'email' field here either - everything depends on your application.
  name: 'UserType',
  fields: {
    email: { type: GraphQLString },
  },
});

module.exports = UserType;
