const { auth } = require("express-oauth2-jwt-bearer");

//middleware to verify jwt tokens
const checkJwt = auth({
  audience: "http://localhost:5000",
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  tokenSigningAlg: "RS256",
});

module.exports = { checkJwt };
