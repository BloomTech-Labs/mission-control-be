const router = require("express").Router();
const Users = require("../models/userModels");

const bcrypt = require("bcryptjs");

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
  try {
    Users.findByEmail(req.body.email).then(() => {
      Users.updateUser(req.body, req.body.email).then(() => {
        res.status(201).json({ message: "User Successfully Updated" });
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//! DELETE
//* Delete a user by user email
router.delete("/", isAdmin, (req, res) => {
  try {
    Users.findByEmail(req.body.email).then(() => {
      Users.deleteUser(req.body.email).then(() => {
        res.status(201).json({ message: "User Successfully Deleted" });
      });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/password", (req, res) => {
  let data = req.body;
  const hashedCurrent = bcrypt.hashSync(data.currentPassword, 14);
  Users.findByEmail(data.email)
    .then(user => {
      if (user) {
        if (hashedCurrent === user.password) {
          const newHashed = bcrypt.hashSync(user.newPassword, 14);
          const packet = {
            ...user,
            password: newHashed
          };
          Users.update(user.email, packet)
            .then(user =>
              res
                .status(200)
                .json({ message: "Updated successfully", user: user })
            )
            .catch(err =>
              res.status(500).json({ message: "Unexpected error" })
            );
        } else {
          res.status(400).json({ message: "Invalid current password" });
        }
      } else {
        res
          .status(404)
          .json({ message: "We couldn't find your account at the moment" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unexpected error", error: err });
    });
});

module.exports = router;
