const router = require("express").Router();
const bcrypt = require("bcryptjs");
const generateToken = require("../middleware/generateToken.js");
const uuid = require('uuid/v4');

const Admins = require("../models/admin_user");

/**
 * @api {post} /api/auth/admin/login Admin Login Request
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
 *    "password": "noneya:)",
 *    "role": "example role"
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 * }
 */

router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    Admins.findByEmail(email)
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            user: { ...user, password: "noneya:)" },
            token: token
          });
        } else {
          res.status(400).json({
            message: "Invalid credentials."
          });
        }
      })
      .catch(err =>
        res.status(500).json({
          message: "We couldn't process your login at the moment"
        })
      );
  } else {
    res.status(400).json({
      message: "Please provide your email and password."
    });
  }
});

/**
 * @api {post} /api/auth/admin/register Admin Register Request
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

router.post("/admin/register", (req, res) => {
  let credentials = req.body;
  if (
    credentials.email &&
    credentials.password &&
    credentials.roleId &&
    credentials.firstName &&
    credentials.lastName
  ) {
    credentials.password = bcrypt.hashSync(credentials.password, 14);

    // ? NORMALIZING NAMES AND ASSIGNING UUID

    credentials.firstName = credentials.firstName.charAt(0).toUpperCase() + credentials.firstName.substr(1).toLowerCase()
    credentials.lastName = credentials.lastName.charAt(0).toUpperCase() + credentials.lastName.substr(1).toLowerCase()
    credentials.id = uuid();

    Admins.add(credentials)
      .then(user => {
        const token = generateToken(user);
        res.status(201).json({
          user: { ...user, password: "noneya:)" },
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
