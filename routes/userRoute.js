const router = require("express").Router();
const Users = require("../models/userModels");

const bcrypt = require("bcryptjs");

//* 'Middleware'
const isAdmin = require("../middleware/isAdmin");

//! READ
//* Get all users 
// ! ADMIN ONLY
router.get("/", isAdmin, (req, res) => {
    Users.find()
    .then(users => {
      res.status(200).json({ users: users });
    })
    .catch( err =>{
      res.status(500).json({ message: "Unexpected error", error: err });
    })
});

//* Get all users by role
// ! ADMIN ONLY
router.get("/:role", isAdmin, (req, res) => {
  const { role } = req.params
    Users.findByRole(role)
      .then(users => {
        if(users){
          res.status(200).json({ users: users });
        }else if(!users){
          res.status(404).json({ message:'Please provide a valid user role'})
        }
      })
      .catch( err => {
        res.status(500).json({message: "Unexpected error", error:err});
      })
});

//* Update a user profile by user email
//! ADMINS ONLY
router.put("/", isAdmin, ( req, res ) => {
  const { email, roleId, id, firstName, lastName } = req.body
  // checking for all required fields in request body
  if( !email || !roleId || !id || !firstName || !lastName ){
    res.status(400).json({ message: "Please provide an email, role, and roleId"})
  }else{
    // if all required fields are provided update request continues
    Users.updateUser(req.body, email)
      .then(( updatedUser ) => {
        res.status(201).json({ message: "User Successfully Updated", updateUser: updatedUser });
      })
      .catch( err => {
        res.status(500).json(err)
      })
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

//* Update a password
//! ALL USERS
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
