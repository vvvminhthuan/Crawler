"use strict"

const JWT = require('../Auth/JWT')
const { setRes }= require('../Helpers/Response')

module.exports = {
    Auth: function (req, res, next) {
        try {
            let info = JWT.verifyCode(req)
            if (account) {
                req.infor = infor
                return next()
            }
            setRes(res, 401, false, 'User not allowed to access', [], false)
        } catch (error) {
            setRes(res, 401, false, 'User not allowed to access', [], false)
        }
    }
}