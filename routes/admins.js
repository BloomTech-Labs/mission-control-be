const router = require("express").Router();
const Users = require("../models/users");
const bcrypt = require('bcryptjs')

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch(err => {
      res.status(500).json({ message: "Unexpected error", error: err });
    });
});

router.put("/update/password", (req, res) => {
  let data = req.body
  const hashedCurrent = bcrypt.hashSync(data.currentPassword, 14)
    Users.findByEmail(data.email)
      .then( user => {
        if(user){
          if(hashedCurrent === user.password){
            const newHashed = bcrypt.hashSync(user.newPassword, 14)
            const packet = {
              ...user,
              password: newHashed
            }
            Users.update(user.email, packet)
            .then((user) => res.status(200).json({message: 'Updated successfully', user: user}))
            .catch( err => res.status(500).json({message: 'Unexpected error'}))
          }else{
            res.status(400).json({message: 'Invalid current password'})
          }
        }else{
          res.status(404).json({message: "We couldn't find your account at the moment"})
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Unexpected error", error: err });
      });
});


module.exports = router;
