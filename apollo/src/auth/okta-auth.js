const OktaJwtVerifier = require('@okta/jwt-verifier');

// Constants
const AUD = 'api://default';

// Instantiate OKTA client with Mission Control credentials
const O = new OktaJwtVerifier({
  issuer: process.env.OAUTH_TOKEN_ENDPOINT,
  clientId: process.env.OAUTH_CLIENT_ID,
  assertClaims: {
    aud: AUD,
  },
});

const decodeToken = async req => {
  const match = req.match(/Bearer (.+)/);

  if (!match) {
    throw new Error('Invalid token');
  }

  // Yoinks out the 'Bearer ' prefix
  const token = match[1];

  try {
    const { claims: Claims } = await O.verifyAccessToken(token, AUD);
    const { Auth: claims, uid: id } = Claims;
    return { id, claims };
  } catch (err) {
    throw new Error(err);
  }
};

// Construct a context object for a specific authorization server.
// Should eventually accept more than just OKTA as an auth provider.
const constructOktaContext = async accessToken => {
  const token = `Bearer ${accessToken}`;
  const { id, claims } = await decodeToken(token);
  const user = { id, claims };
  return user;
};

module.exports = constructOktaContext;
