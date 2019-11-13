require("dotenv").config();
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid/v4");
const validator = require("validator");

const Users = require("../models/userModels");

//* 'Middleware'
const generateToken = require("../middleware/generateToken");

/**
 * @api {post} /api/auth/login Admin Login Request
 * @apiName Admin Login
 * @apiGroup Auth
 *
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} token Token
 *
 * @apiParamExample Example Body:
 * {
 *	"email": "example",
 *	"password": "password"
 * }
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 200 OK
 * {
 *  "user": {
 *    "id": "cc1804a4-a517-4c36-b100-339b10195923",
 *    "firstName": "John",
 *    "lastName": "Doe",
 *    "email": "example1@example1.com",
 *    "roleId": "cc1804a4-a517-4c36-b100-339b10195923",
 *    "role": "example"
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */

router.post("/login", (req, res) => {
	// checks that email is data type string
	// and that the string has characters
    const email = typeof(req.body.email) === "string"
		&& req.body.email.trim().length > 0
		? req.body.email.trim() : false;
	// checks that password is data type string
	// and that the string has characters
    const password = typeof(req.body.password) === "string"
		&& req.body.password.trim().length > 0
		? req.body.password.trim() : false;
    
	// if correct data type 
	if (
	    email && password
    ) {
		// check for correct email format
		// and check correct password length
	    if (
		    validator.isEmail(email)
			&& password.length >= 8
			&& password.length <= 16
		) {
			// if the email is a valid email 
			// and if the password is a length between 8 and up to 16
			// search for the user by email
			Users.findByEmail(email)
		      .then(user => {

				// if user is not found 
				  if(!user){
					res.status(404).json({message: 'User not found'})
				  }

				  // if the user is found by email
				  // and if the password is correct
			      if (user && bcrypt.compareSync(password, user.password)) {
					  // remove the password before sending to response
					  delete user.password;
					  // generate token
					  const token = generateToken(user);
					if(token){
						// send response
						res.status(200).json({
						  user: user ,
						  token: token
						});
					}
					if(!token){
						res.status(409).json({message: 'Token unable to generate due to request made'})
					}
				  }
				  // if email wasn't found
				  // or if incorrect password
				  if (
				      !user 
					  || !bcrypt.compareSync(password, user.password)
				  ) {
					  //incorrect email or password
				      res.status(400).json({
					      message: "Incorrect email or password."
					  });
				  } 
		      })
		      .catch(err =>
			      res.status(500).json({
			  	      message: "We couldn't process your login at the moment"
				    })
		      );
		}

		// if incorrect email format
		// or if the length of the password is less than 8
		// or if the length of the password is more than 16
		// send specific error based on input
		if (
			!validator.isEmail(email)
			|| (
				password.length < 8
				|| password.length > 16
			)
		) {
			// if incorrect email format
			// but correct password length
			if (
				!validator.isEmail(email)
				&& (
					password.length >= 8
					&& password.length <= 16
				) 
			) {
				res.status(400).json({
					message: "Invalid email format"
				});
			}
			
			// if correct email format
			// but incorrect password length
			if (
				validator.isEmail(email)
				&& (
					password.length < 8
					|| password.length > 16
				)
			) {
				res.status(400).json({
					message: "Password must be between 8 and up to 16 characters"
				});
			}
			
			// if incorrect email format
			// and if incorrect length of password
			if (
				!validator.isEmail(email)
				&& (
					password.length < 8
					|| password.length > 16
				)
			) {
				res.status(400).json({
					message: "Invalid email format and password must be between 8 and up to 16 characters."
				});
			}
		}
    }
	
	// if the incorrect data type is received
    if (
		!email || !password
	) {
		// invalid credentials
		res.status(400).json({
			message: "Invalid credentials."
		});
	}
});

/**
 * @api {post} /api/auth/register Admin Register Request
 * @apiName Admin Register
 * @apiGroup Auth
 *
 *
 * @apiSuccess {Object} user User
 * @apiSuccess {String} token Token
 *
 * @apiParamExample Example Body:
 *  {
 *    "firstName": "example",
 *	  "lastName": "doe",
 *    "email": "example@random.com",
 * 	  "password": "password",
 *    "roleId": "123abc"
 *  }
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 CREATED
 * {
 *  "user": {
 *    "id": "cc1804a4-a517-4c36-b100-339b10195923",
 *    "firstName": "John",
 *    "lastName": "Doe",
 *    "email": "example1@example1.com",
 *    "roleId": "cc1804a4-a517-4c36-b100-339b10195923",
 *    "role": "example"
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */

router.post("/register", (req, res) => {
	const firstName = typeof(req.body.firstName) === "string"
		&& req.body.firstName.trim().length >= 1
		? req.body.firstName.trim() : false;
	const lastName = typeof(req.body.lastName) === "string"
		&& req.body.lastName.trim().length >= 1
		? req.body.lastName.trim() : false;
	const email = typeof(req.body.email) === "string"
		&& req.body.email.trim().length > 0
		? req.body.email.trim() : false;
	const password = typeof(req.body.password) === "string"
		&& req.body.password.trim().length > 0
		? req.body.password.trim() : false;
	const roleId = typeof(req.body.roleId) === "string"
		&& req.body.roleId.trim().length > 0
		? req.body.roleId.trim() : false;
	
	// if the data types are correct	
    if (
		firstName
		&& lastName
		&& email
		&& password
		&& roleId
    ) {
		// if valid email format and the password is correct length
		if (
			validator.isEmail(email)
			&& password.length >= 8
			&& password.length <= 16
		) {
			// credentials will be added to the database
			let credentials = {
				firstName,
				lastName,
				email,
				roleId
			};
			// set password to a hashed password on the credentials object
			credentials.password = bcrypt.hashSync(password, 14);

			// NORMALIZING NAMES AND ASSIGNING UUID
			credentials.firstName =
			  credentials.firstName.charAt(0).toUpperCase() +
			  credentials.firstName.substr(1).toLowerCase();
			credentials.lastName =
			  credentials.lastName.charAt(0).toUpperCase() +
			  credentials.lastName.substr(1).toLowerCase();
			credentials.id = uuid();
			// adds user to database
			Users.add(credentials)
			  .then(user => {
				  if(user){
					  // deletes password before sending response
					  delete user.password;
					  // generate token
					  const token = generateToken(user);
					  // send response
					  if(token){
						  res.status(201).json({
							  user: user,
							  token: token
						  });
					  }
					  //if token is falsy
					  if(!token){
						res.status(409).json({message: 'Token unable to generate due to request made'})
					  }
				  }
				  if(!user){
					  res.status(404).json({message: 'User not found'})
				  }
			})
			  .catch(err => {
				  res.status(500).json({
					  message: "We couldn't process your registration at the moment"
				  })
			  });
		}

		// if incorrect email format
		// or if the length of the password is less than 8
		// or if the length of the password is more than 16
		// send specific error based on input
		if (
			!validator.isEmail(email)
			|| (
				password.length < 8
				|| password.length > 16
			)
		) {
			// if incorrect email format
			// but correct password length
			if (
				!validator.isEmail(email)
				&& password.length >= 8
				&& password.length <= 16
			) {
				res.status(400).json({
					message: "Invalid email format"
				});
			}
			
			// if correct email format
			// but incorrect password length
			if (
				validator.isEmail(email)
				&& (
					password.length < 8
					|| password.length > 16
				)
			) {
				res.status(400).json({
					message: "Password must be between 8 and up to 16 characters"
				});
			}
			
			// if incorrect email format
			// and if incorrect length of password
			if (
				!validator.isEmail(email)
				&& (
					password.length < 8
					|| password.length > 16
				)
			) {
				res.status(400).json({
					message: "Invalid email format and password must be between 8 and up to 16 characters."
				});
			}
		}
		
    }

	// if any incorrect data type
	if (
		!firstName
		|| !lastName
		|| !email
		|| !password
		|| !roleId
	) {
		res.status(400).json({
		    message: "Invalid credentials."
		});
	} 
});

module.exports = router;
