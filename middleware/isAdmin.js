const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.adminSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid Token" });
      } else if (decodedToken.role === "admin") {
        next();
      } else {
        res.status(401).json({ message: "Invalid Permissions" });
      }
    });
  } else {
    res.status(400).json({ message: "No Token Provided" });
  }
};
