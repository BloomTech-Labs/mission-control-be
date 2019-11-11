const router = require("express").Router();
const Users = require("../models/userModels");
const Roles = require('../models/rolesModels')

const bcrypt = require("bcryptjs");

//* 'Middleware'
const isAdmin = require("../middleware/isAdmin");


/**
 * @api {get} /api/users Get All Users
 * @apiName GetAllUsers
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Object[]} users List of all users in the database.
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *  "users": [
 *    {
 *      "userId": "3a966d8d-efa0-4c30-a5d7-e190f6334056",
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "email": "example1@example1.com",
 *      "role": "example"
 *    },
 *    {
 *      "userId": "95205b59-1d89-4e9d-9746-c72db32f5779",
 *      "firstName": "Jane",
 *      "lastName": "Doe",
 *      "email": "example2@example2.com",
 *      "role": "example"
 *    },
 *    {
 *      "userId": "a498a75c-9b59-4036-91f9-e82914a2aaca",
 *      "firstName": "Jim",
 *      "lastName": "Doe",
 *      "email": "example3@example3.com",
 *      "role": "example"
 *    }
 *  ]
 * }
 */

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

/**
 * @api {get} /api/users/roles Get All Roles
 * @apiName GetAllRoles
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Object[]} users List of all roles in the database.
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *  "roles": [
 *    {
 *      "id": "3a966d8d-efa0-4c30-a5d7-e190f6334056",
 *      "name": "example"
 *    },
 *    {
 *      "id": "95205b59-1d89-4e9d-9746-c72db32f5779",
 *      "name": "example"
 *    },
 *    {
 *      "id": "a498a75c-9b59-4036-91f9-e82914a2aaca",
 *      "name": "example"
 *    }
 *  ]
 * }
 */

//! READ
//* Get all users 
// ! ADMIN ONLY
router.get("/roles", isAdmin, (req, res) => {
  Roles.find()
  .then(roles => {
    res.status(200).json({ roles: roles });
  })
  .catch( err =>{
    res.status(500).json({ message: "Unexpected error", error: err });
  })
});

/**
 * @api {get} /api/users/:role Get All Users By Role
 * @apiParam {String} role A Role Name Specified For Each User.
 * 
 * @apiName GetAllUsersByRole
 * @apiGroup Admin
 *
 *
 * @apiSuccess {Object[]} users List of all users with role requested
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *  "users": [
 *    {
 *      "userId": "3a966d8d-efa0-4c30-a5d7-e190f6334056",
 *      "firstName": "John",
 *      "lastName": "Doe",
 *      "email": "example1@example1.com",
 *      "role": "example"
 *    },
 *    {
 *      "userId": "95205b59-1d89-4e9d-9746-c72db32f5779",
 *      "firstName": "Jane",
 *      "lastName": "Doe",
 *      "email": "example2@example2.com",
 *      "role": "example"
 *    },
 *    {
 *      "userId": "a498a75c-9b59-4036-91f9-e82914a2aaca",
 *      "firstName": "Jim",
 *      "lastName": "Doe",
 *      "email": "example3@example3.com",
 *      "role": "example"
 *    }
 *  ]
 * }
 */

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

/**
 * @api {put} /api/users/ Update A Users Role
 * 
 * @apiName UpdateAUsersRole
 * @apiGroup Admin
 *
 * @apiParamExample Example Body:
 * {
 *   "id": "95205b59-1d89-4e9d-9746-c72db32f5779",
 *   "firstName": "John",
 *	 "lastName": "Doe",
 *   "email": "example1@example1.com",
 *   "roleId": "a498a75c-9b59-4036-91f9-e82914a2aaca" - NEW ROLE ID
 * }
 * 
 * @apiSuccess {String} message Confirmation message on successful request. 
 * @apiSuccess {Object} user List of updated user object with new role.
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *  "message": "User Successfully Updated",
 *  "updateUser": {
 *    "id": "95205b59-1d89-4e9d-9746-c72db32f5779",
 *    "firstName": "John",
 *    "lastName": "Doe",
 *    "email": "example1@example1.com",
 *    "role": "example",
 *    "roleId": "a498a75c-9b59-4036-91f9-e82914a2aaca"
 *  }
 * }
 */

// Update a user profile by user email
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
        res.status(200).json({ message: "User Successfully Updated", updateUser: updatedUser });
      })
      .catch( err => {
        res.status(500).json(err)
      })
  }
});


/**
 * @api {delete} /api/users/:userId Delete A User
 * @apiParam {String} userId User id of account to be deleted.
 * 
 * @apiName Delete User
 * @apiGroup Admin
 * 
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 204 No Content
 */

//* Delete users by user id
//! ADMIN ONLY
router.delete("/:userId", isAdmin, (req, res) => {
  const { userId } = req.params
      Users.deleteUser(userId)
        .then((deleted) => {
          // deleted argument returns a 0 or 1 depending on userId provided 
          if(deleted){
            res.status(204).json({message: 'Deleted successfully'});
          }else if(!deleted){
            res.status(404).json({message: "Invalid account id"})
          }
        })
        .catch(err => res.status(500).json(err));
});

/**
 * @api {put} /api/users/update/password Update A Users Password
 * 
 * @apiName UpdatePassword
 * @apiGroup UpdateProfile
 * 
 * @apiParamExample Example Body:
 * {
 *    "email": "example1@example1.com",
 *    "newPassword": "password",
 *		"currentPassword":"abc123"
 * }
 * 
 * @apiSuccess {String} message Confirmation message on successful request. 
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *  "message": "Updated Successfully"
 * }
 */

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
              .then(() =>{
                res.status(200).json({ message: "Updated successfully" })
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

// TODO UPDATE EMAIL
module.exports = router;
