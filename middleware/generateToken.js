require("dotenv").config();
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

function generateToken(user) {
  //* Changing the secret used based off of the user's role
  try {
    const payload = {
      subject: user.id,
      user: user.username,
      role: user.role
    };
    const options = {
      expiresIn: "1d"
    };

    switch (user.role) {
      case "admin":
        return jwt.sign(payload, secrets.adminSecret, options);
      case "manager":
        return jwt.sign(payload, secrets.managerSecret, options);
      case "student":
        return jwt.sign(payload, secrets.studentSecret, options);
      default:
        return res
          .status(400)
          .json({ message: "Role Identification Not Found" });
    }
  } catch (err) {
    res.status(500).json({
      message: "We couldn't process your login at the moment"
    });
  }
}
module.exports = generateToken;
