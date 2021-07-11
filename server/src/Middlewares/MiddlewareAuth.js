"use strict"

const JWT = require('../Auth/JWT')
const { setRes }= require('../Helpers/Response')

module.exports = {
    Auth: function (req, res, next) {
        try {
            let infor = JWT.verifyCode(req)
            if (infor) {
                req.infor = infor
                return next()
            }
            setRes(res, 401, false, 'User not allowed to access', [], false)
        } catch (error) {
            setRes(res, 401, false, 'User not allowed to access', [], false)
        }
    },
    detectAuth: function (req, res, next) {
        try {
            let infor = JWT.verifyCode(req)
            if (infor) {
                req.infor = infor 
            }
            return next()
        } catch (error) {
            setRes(res, 401, false, 'User not allowed to access', [], false)
        }
    },
}