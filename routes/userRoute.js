const router = require("express").Router();
const Users = require("../models/userModels");

//* 'Middleware'
const isAdmin = require("../middleware/isAdmin");

//! READ
//* Get all users
router.get("/", isAdmin, (req, res) => {
  try {
    Users.find().then(users => {
      res.status(200).json({ users: users });
    });
  } catch (err) {
    res.status(500).json({ message: "Unexpected error", error: err });
  }
});

//* Get all users by role
router.get("/:role", isAdmin, (req, res) => {
  try {
    Users.findByRole(req.params.role).then(users => {
      res.status(200).json({ users: users });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//! UPDATE
//* Update a user by user email
router.put("/", isAdmin, (req, res) => {
  const { user } = req.body;
  try {
    Users.findByEmail(user).then(user => {
      Users.updateUser(user).then(user => {
        res.status(201).json({ user });
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//! DELETE
//* Delete a user by user id

module.exports = router;
