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
    const result = await O.verifyAccessToken(token, AUD);
    const {
      claims: { sub: email, Auth: claims, uid: id },
    } = result;
    return { id, claims, email };
  } catch (err) {
    throw new Error(err);
  }
};

// Construct a context object for a specific authorization server.
// Should eventually accept more than just OKTA as an auth provider.
const constructOktaContext = async accessToken => {
  const token = `Bearer ${accessToken}`;
  const user = await decodeToken(token);
  return user;
};

module.exports = constructOktaContext;
