const router = require("express").Router();
const Users = require("../models/admin_user");

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(err => {
      res.status(500).json({ message: "Unexpected error", error: err });
    });
});

module.exports = router;
