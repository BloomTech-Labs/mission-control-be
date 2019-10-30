const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  token
    ? jwt.verify(token, secrets.adminSecret, (err, decodedToken) => {
        err
          ? res.status(401).json({ message: "Invalid Token" })
          : decodedToken.role === "admin"
          ? next()
          : res.status(401).json({ message: "Invalid Permissions" });
      })
    : res.status(400).json({ message: "No Token Provided" });
};
