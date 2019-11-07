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

//* Delete users by user id
//! ADMIN ONLY
router.delete("/:userId", isAdmin, (req, res) => {
  const { userId } = req.params
      Users.deleteUser(userId)
        .then((deleted) => {
          // deleted argument returns a 0 or 1 depending on userId provided 
          if(deleted){
            res.status(204);
          }else if(!deleted){
            res.status(404).json({message: "Invalid account id"})
          }
        })
        .catch(err => res.status(500).json(err));
});

//* Update a password
//! ALL USERS
router.put("/update/password", (req, res) => {
  const { newPassword, currentPassword, email } = req.body
  // checking for all required fields in request body
  if( !email || !currentPassword || !newPassword){
    res.status(400).json({ message: "please provide the credentials needed"})
  }else{
    let data = req.body;
    Users.findByEmail(email)
      .then(user => {
        // if there if a user then update the password
        if(user) {
          // if the user is found and the current password is sent in request execute code block below
          if (bcrypt.compareSync( data.currentPassword, user.password)) {
            user.password = bcrypt.hashSync(newPassword, 14);
            // delete role property from the user object to avoid conflicts with DB
            delete user.role
            Users.updateUser(user, user.email)
              .then( updatedUser =>{
                delete updatedUser.password
                res.status(200).json({ message: "Updated successfully", user: updatedUser })
              })
              .catch(err =>
                res.status(500).json({ message: "Unexpected error" })
             );
        // if the password provided isnt current password in DB return 400 status code
        } else {
          res.status(400).json({ message: "Invalid current password" });
        }
      // if no user is found in the DB return 404
      } else {
        res.status(404).json({ message: "We couldn't find your account at the moment" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unexpected error", error: err });
    });
  }
});

module.exports = router;
