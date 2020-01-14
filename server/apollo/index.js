const { ApolloServer } = require('apollo-server');
const { prisma } = require('../prisma/generated/prisma-client');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Resolvers
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const Program = require('./resolvers/Program');
const Product = require('./resolvers/Product');
const Project = require('./resolvers/Project');
const ProjectNote = require('./resolvers/ProjectNote');
const ProjectRole = require('./resolvers/ProjectRole');
const ProductRole = require('./resolvers/ProductRole');
const ProgramRole = require('./resolvers/ProgramRole');
const Person = require('./resolvers/Person');

// OKTA specific authorization middleware
const constructOktaContext = require('./auth/okta-auth');

const dummyUser = {
  id: 'flskjfsd98jsdlfsjlsdfjlA',
  email: 'nicholas@gmail.com',
  claims: ['Everyone', 'Project Manager'],
};

(async () => {
  // ===================================================================
  // Create context object to pass request, user object containing result
  // of Authentication/Authorization middleware, along with prisma client
  // into all resolvers. Throws error if requests are not authenticated.

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
      user: dummyUser,
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
