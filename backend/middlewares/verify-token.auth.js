const jwt = require("jsonwebtoken");
const jwksClient = require("jwks-rsa");

const auth0Domain = "dev-qlvesfqc.eu.auth0.com";
const audience = "https://dev-qlvesfqc.eu.auth0.com/api/v2/";

const jwksClientInstance = jwksClient({
  jwksUri: `https://${auth0Domain}/.well-known/jwks.json`,
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Token not provided" });
  }
  jwt.verify(token, getKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res
        .status(401)
        .json({ message: "Authentication failed: Invalid token" });
    }
    req.userId = decoded.sub;
    next();
  });
};

// Function to fetch the appropriate public key from JWKS
function getKey(header, callback) {
  jwksClientInstance.getSigningKey(header.kid, (err, key) => {
    if (err) {
      callback(err);
    } else {
      const signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

module.exports = verifyToken;
