require("dotenv").config();
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");

function generateToken(user) {
  //* Changing the secret used based off of the user's role
  try {
    user.role === "admin"
      ? ((secret = secrets.adminSecret), console.log("Admin Secret Used"))
      : user.role === "manager"
      ? ((secret = secrets.managerSecret), console.log("Manager Secret Used"))
      : user.role === "student"
      ? ((secret = secrets.studentSecret), console.log("Student Secret Used"))
      : res.status(400).json({
          message: "Role Identification Not Found"
        });
  } catch (err) {
    res.status(500).json({
      message: "We couldn't process your login at the moment"
    });
  }
  //
  //* Signing the JWT
  const payload = {
    subject: user.id,
    user: user.username,
    role: user.role
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secret, options);
}
module.exports = generateToken;
