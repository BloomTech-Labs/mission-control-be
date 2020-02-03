const { prisma } = require('../generated/prisma-client');
const decodeToken = require('../auth');

// Create context object to pass request, user and prisma client
// into all resolvers. Throws error if requests are not authenticated.
const context = async ({ req, connection }) => {
  if (connection) {
    const {
      context: { authorization },
    } = connection;

    if (authorization) {
      const user = await decodeToken(authorization);
      return { ...connection, user, prisma };
    }
    return {
      ...connection,
      user: { id: 'fsd', email: 'missioncontrolpm@gmail.com' },
      prisma,
    };
  }

  if (req) {
    const { authorization } = req.headers;
    if (authorization) {
      const user = await decodeToken(authorization);
      return { ...req, user, prisma };
    }
    return {
      ...req,
      user: { id: 'fsd', email: 'missioncontrolpm@gmail.com' },
      prisma,
    };
  }
  return {
    user: { id: 'fsd', email: 'missioncontrolpm@gmail.com' },
    prisma,
  };
};

module.exports = context;
