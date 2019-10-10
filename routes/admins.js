const router = require('express').Router()
const Admins = require('../models/admin_user')

router.get('/', (req, res) => {
    Admins.find()
        .then((admins) => {
            res.status(200).json({admins: admins})
        })
        .catch(err => {
            res.status(500).json({message: "Unexpected error", error: err})
        })
})

module.exports = router