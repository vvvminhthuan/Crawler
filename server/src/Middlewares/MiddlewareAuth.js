"use strict"

const JWT = require('../Auth/JWT')

module.exports = {
    Auth: function (req, res, next) {
        try {
            if (JWT.verifyCode(req)) {
                return next()
            }
            res.status(403)
            return res.json({
                success: false,
                message: 'User is not allowed to access', 
            })
        } catch (error) {
            res.status(403)
            res.json({
                status: false, 
                message: 'User is not allowed to access' 
            })
        }
    }
}