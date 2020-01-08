const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { prisma } = require('../prisma/generated/prisma-client');
const authReq = require('./auth/auth-middleware');

// Temporary data until DB is in place
const dummyData = require('./dummy');

(async () => {
  const resolvers = {
    Query: {
      info: async () => {
        return dummyData;
      },
    },
  };

  /**
   * Create context object to pass request, user object containing result
   * of Authentication/Authorization middleware, along with prisma client
   * into all resolvers. Throws error if requests are not authenticated.
   * */

  const context = async ({ req }) => {
    const { headers } = req;
    const { id, claims } = await authReq(headers);

    if (!claims.includes('Everyone')) throw new Error('ff');

    const user = { id, claims };

    return {
      ...req,
      user,
      prisma,
    };
  };

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context,
  });

  const { url } = await server.listen();
  // eslint-disable-next-line no-console
  console.log(url);
})();
