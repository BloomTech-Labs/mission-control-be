const OktaJwtVerifier = require('@okta/jwt-verifier');

// Configure OKTA client
const O = new OktaJwtVerifier({
  issuer: 'https://dev-601359.okta.com/oauth2/default',
  clientId: '0oa2bh68ejiDpKNBD357',
  assertClaims: {
    aud: 'api://default',
  },
});

const decodeToken = async req => {
  const match = req.match(/Bearer (.+)/);

  if (!match) {
    throw new Error('Invalid token');
  }

  // Extract pure token, stripped of 'Bearer '
  const token = match[1];

  // Verify audience from client config
  const aud = 'api://default';

  try {
    const { claims: Claims } = await O.verifyAccessToken(token, aud);
    const { Auth: claims, uid: id } = Claims;
    return { id, claims };
  } catch (err) {
    throw new Error(err);
  }
};

const constructOktaContext = async accessToken => {
  const token = `Bearer ${accessToken}`;
  const { id, claims } = await decodeToken(token);
  const user = { id, claims };
  return user;
};

module.exports = constructOktaContext;
