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

const decodeToken = async token => {
  try {
    const result = await O.verifyAccessToken(token, AUD);
    const {
      claims: { sub: email, Auth: claims, uid: id },
    } = result;
    return { id, claims, email };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    throw new Error('Invalid token');
  }
};

module.exports = decodeToken;
