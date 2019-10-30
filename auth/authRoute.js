const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken.js");
const uuid = require("uuid/v4");
const validator = require("validator");

const Users = require("../models/admin_user");

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
 *    "id": "123e4567-e89b-12d3-a456-426655440000",
 *    "username": "example",
 *    "email": "example@gmonk.com",
 *    "role": "example role"
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */

router.post("/login", (req, res) => {
    const email = typeof(req.body.email) === "string" 
		? req.body.email.trim() : false;
    const password = typeof(req.body.password) === "string"
		? req.body.password.trim() : false;
    
	// if correct data type 
	if (
	    email && password
    ) {
		// check for correct email format
		// and check correct password length
	    if (
		    validator.isEmail(email)
			&& (
			    password.length > 8
				|| password.length <= 16
			)
		) {
			// if the email is a valid email 
			// and if the password is a length between 8 and up to 16
			// search for the user by email
			Users.findByEmail(email)
		      .then(user => {
				  // if the user is found by email
				  // and if the password is correct
			      if (user && bcrypt.compareSync(password, user.password)) {
					  // remove the password before sending to response
					  delete user.password;
					  // generate token
					  const token = generateToken(user);
					  // send response
					  res.status(200).json({
						user: { ...user },
						token: token
					  });
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
		if (
			!validator.isEmail(email)
			|| (
				password.length < 8
				|| password.length > 16
			)
		) {
			// invalid credentials
			res.status(400).json({
				message: "Invalid credentials"
			});
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
 *    "password": "password",
 *    "roleId": "123abc"
 *  }
 *
 * @apiSuccessExample Successful Response:
 * HTTP/1.1 201 CREATED
 * {
 *  "user": {
 *    "id": "123e4567-e89b-12d3-a456-426655440000",
 *    "username": "example",
 *    "email": "example@random.com",
 *    "password": "noneya:)",
 *    "role": "example role"
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */

router.post("/register", (req, res) => {
  const {
	firstName, 
	lastName,
	email,
	password,
	roleId
  } = req.body;
  const credentials = Object.create({
	firstName,
	lastName,
	email,
	password,
	roleId
  }); 
  
  if (
    typeof(credentials.email) === "string" &&
    typeof(credentials.password) === "string" &&
    typeof(credentials.firstName) === "string" &&
    typeof(credentials.roleId) === "string" &&
    typeof(credentials.lastName) === "string"
  ) {
    credentials.password = bcrypt.hashSync(credentials.password, 14);

    //? NORMALIZING NAMES AND ASSIGNING UUID
    credentials.firstName =
      credentials.firstName.charAt(0).toUpperCase() +
      credentials.firstName.substr(1).toLowerCase();
    credentials.lastName =
      credentials.lastName.charAt(0).toUpperCase() +
      credentials.lastName.substr(1).toLowerCase();
    credentials.id = uuid();

    Users.add(credentials)
      .then(user => {
		delete user.password;
        const token = generateToken(user);
        res.status(201).json({
          user: { ...user },
          token: token
        });
      })
      .catch(err =>
        res.status(500).json({
          message: "We couldn't process your registration at the moment"
        })
      );
  } else {
    res.status(400).json({
      message: "Please provide all credentials."
    });
  }
});

module.exports = router;
