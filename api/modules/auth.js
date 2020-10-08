/**
 * MODULE TO AUTHENTICATE
 */
const express = require('express')
var router = express.Router()

router.use(
    function (req, res, next) {
        if(process.env.API_KEY == req.headers.access_token) {
            next()
        } else {
            res.send({code: 401, message: 'authentication_error'})
        }
    }
)

module.exports = router
