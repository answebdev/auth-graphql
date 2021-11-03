const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        // If we want a password confirmation, we can do a password confirmation on the front end.
        // So we don't really need to send both a password and password confirmation to the backend -
        // So, we don't need a password confirmation here.
      },
      // The 'request' argument ('req') (the third argument in the 'resolve') is sometimes also called 'context' -
      // 'it represents the request object coming from Express.
      // When we make an HTTP request to the backend of any type (e.g., from GraphQL, the fetch helper, jQuery, etc.),
      // it enters into our Express application as a request.
      // So this third 'request' argument that is being passed to this 'resolve' function is that request object.
      // The request object has a bunch of details about the incoming request, such as what route a user was trying to access,
      // the body of the request if one exists, and other associated properties.
      // For us, it's going to be very helpful here, because we're going to use the request object to help out with the authentication side of things.
      // We can also destructure 'args' below:
      //   resolve(parentValue, args, request) {
      resolve(parentValue, { email, password }, req) {
        // AuthService.signup({email, password, req: request})
        return AuthService.signup({ email, password, req });
      },
    },
  },
});

module.exports = mutation;
