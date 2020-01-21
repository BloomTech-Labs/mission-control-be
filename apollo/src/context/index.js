// Prisma MUST be passed into all resolvers. Do not move this.
const { prisma } = require('../generated/prisma-client');

// OKTA specific authorization middleware
const constructOktaContext = require('../auth/okta-auth');

const dummyUser = {
  id: 'ck5max4wb00180790dc38y4vx',
  email: 'nicholas.gebhart@gmail.com',
  claims: ['Project Manager'],
};

// Create context object to pass request, user object containing result
// of Authentication/Authorization middleware, along with prisma client
// into all resolvers. Throws error if requests are not authenticated.

const context = async ({ req }) => {
  const { authorization } = req.headers;
  if (authorization) {
    const user = await constructOktaContext(authorization);
    console.log(user);
    return { ...req, user, prisma };
  }

  // NOTE: All unauthenticated requests are passed a dummy user for testing.
  // If your authorization is failing, this is why.

  return {
    ...req,
    prisma,
    user: dummyUser,
  };
};

module.exports = context;
