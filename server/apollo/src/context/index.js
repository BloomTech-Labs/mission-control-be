const { prisma } = require('../../../prisma/generated/prisma-client');

// OKTA specific authorization middleware
const constructOktaContext = require('../auth/okta-auth');

// Dummy user for testing
const dummyUser = {
  id: 'flskjfsd98jsdlfsjlsdfjlA',
  email: 'nicholas@gmail.com',
  claims: ['Project Manager'],
};

// ===================================================================
// Create context object to pass request, user object containing result
// of Authentication/Authorization middleware, along with prisma client
// into all resolvers. Throws error if requests are not authenticated.

const context = async ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const user = await constructOktaContext(authorization);
    return { ...req, user, prisma };
  }

  return {
    ...req,
    prisma,
    user: dummyUser,
  };
};

module.exports = context;