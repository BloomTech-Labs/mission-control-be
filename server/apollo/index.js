const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { prisma } = require('../prisma/generated/prisma-client');

// Resolvers
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const Program = require('./resolvers/Program');
const Product = require('./resolvers/Product');
const Project = require('./resolvers/Project');

// OKTA specific authorization middleware
const constructOktaContext = require('./auth/okta-auth');

(async () => {
  /**
   * Create context object to pass request, user object containing result
   * of Authentication/Authorization middleware, along with prisma client
   * into all resolvers. Throws error if requests are not authenticated.
   * */

  const context = async ({ req }) => {
    const { authorization } = req.headers;
    if (authorization) {
      const { type, accessToken } = JSON.parse(authorization);
      switch (type) {
        case 'OKTA': {
          const user = await constructOktaContext(accessToken);
          return { ...req, user, prisma };
        }
        default:
      }
    }
    return {
      ...req,
      prisma,
    };
  };

  const resolvers = {
    Query,
    Mutation,
    Program,
    Product,
    Project,
  };

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
    cors: true,
  });

  const { url } = await server.listen();
  // eslint-disable-next-line no-console
  console.log(url);
})();
