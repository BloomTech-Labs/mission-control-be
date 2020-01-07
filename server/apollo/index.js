const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { prisma } = require('../prisma/generated/prisma-client');
const authReq = require('./auth/auth-middleware');

const dummyData = require('./dummy');

(async () => {
  const resolvers = {
    Query: {
      info: async (parent, args, context) => {
        const { claims } = context.user;
        return claims.includes('Everyone') ? dummyData : null;
      },
    },
  };

  const context = async ({ req }) => {
    const { headers } = req;
    const { id, claims } = await authReq(headers);
    const user = { id, claims };

    if (!claims.includes('Everyone')) throw new Error('ff');

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
