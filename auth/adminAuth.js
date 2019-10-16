const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('../middleware/generateToken.js')

const Admins = require('../models/admin_user')

/**
 * @api {post} /api/auth/admin/login Admin Login Request
 * @apiName Admin Login
 * @apiGroup Auth
 * 
 * 
 * @apiSuccess {Object} user User User
 * @apiSuccess {String} token User Token
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
 *    "id": 5,
 *    "username": "example",
 *    "email": "example@gmonk.com",
 *    "password": "$2a$14$IF9EQY7mpuNU2a5TVAAE8O7GLmcHBFRvEiv5jCl5RT1uJa1mojudS"
 *  },
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicGd1c2VyMTAwIiwidXNlclR5cGUiOiJjb25zdW1lciIsImlhdCI6MTU2OTM0NzE3NiwiZXhwIjoxNTY5NDMzNTc2fQ.EfLfuc_DcYZ5TtjM-Zpd7mwkUPozNhYh-i5jg3YQ-us"
 * }
 */

router.post('/admins', (req, res) => {
    const { email, password} = req.body
    if (email && password) {
        Admins.findByEmail(email)
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    const token = generateToken(user)
                    res.status(200).json({
                        user: {...user, password:'noneya:)'},
                        token: token
                    })
                } else {
                    res.status(400).json({
                        message: 'Invalid credentials.'
                    })
                }
            })
            .catch(err => res.status(500).json({
                message: "We couldn't process your login at the moment"
            }))
    } else {
        res.status(400).json({
            message: 'Please provide your email and password.'
        })
    }
})

module.exports = router