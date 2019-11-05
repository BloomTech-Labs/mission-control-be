require("dotenv").config();
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

function generateToken(user) {
  //* Changing the secret used based off of the user's role
    const payload = {
      subject: user.id,
      user: user.firstName,
      role: user.roleId
    };
    const options = {
      expiresIn: "1d"
    };

    switch (user.roleId) {
      case "03":
        return jwt.sign(payload, secrets.adminSecret, options);
      case "02":
        return jwt.sign(payload, secrets.managerSecret, options);
      case "01":
        return jwt.sign(payload, secrets.studentSecret, options);
      default:
        return 
    }
}
module.exports = generateToken;
