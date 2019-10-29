const router = require("express").Router();
const Users = require("../models/admin_user");

router.get("/test", (req, res) => {
  try {
    Users.find().then(users => {
      res.status(200).json({ users: users });
    });
  } catch (err) {
    res.status(500).json({ message: "Unexpected error", error: err });
  }
});

//! READ
//* Get all users
router.get("/", (req, res) => {
  try {
    Users.find().then(users => {
      res.status(200).json({ users: users });
    });
  } catch (err) {
    res.status(500).json({ message: "Unexpected error", error: err });
  }
});

//* Get all users by role
router.get("/roles", (req, res) => {
  try {
    let role = {
      admin: "03",
      manager: "02",
      student: "01"
    };

    Users.findBy({ roleId: role.student }).then(users => {
      res.status(200).json({ users: users });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//! UPDATE
//* Update a user by user id

//! DELETE
//* Delete a user by user id

//! MIDDLEWARE

/* function isAdmin(req, res, next) {

} */

module.exports = router;
