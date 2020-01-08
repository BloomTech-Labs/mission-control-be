const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { prisma } = require('../prisma/generated/prisma-client');

// OKTA specific authorization middleware
const oktaAuthReq = require('./auth/auth-middleware');

// Temporary data until DB is in place
const dummyData = require('./dummy');

(async () => {
  const resolvers = {
    Query: {
      // Log out context user object as proof of concept
      // that role-based information is beind threaded into the resolvers
      info: async (parent, args, context) => {
        // eslint-disable-next-line no-console
        console.log(context.user);
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
    const { authorization } = req.headers;
    const { type, accessToken } = JSON.parse(authorization);

    switch (type) {
      case 'OKTA': {
        /** OKTA-specific login flow matches against 'type' case from
         * client-side fetchOptions on graphQL client. */

        const token = `Bearer ${accessToken}`;
        const { id, claims } = await oktaAuthReq(token);

        if (!claims.includes('Everyone')) throw new Error('aaaa');

        const user = { id, claims };

        return {
          ...req,
          user,
          prisma,
        };
      }
      /** Default case returns request and prisma client
       * May update to provide proper authentication */

      default:
        return {
          ...req,
          prisma,
        };
    }
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
