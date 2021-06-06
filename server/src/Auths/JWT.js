'user strict'
const config = require('../Config')
const jwt = require('jsonwebtoken')

const JWT = () => {
    var options = {
        algorithm: config.ALG,
        expiresIn: parseInt(config.EXP),
    }
    var secret = config.SECRET
    return {
        signCode: (data, exp = 0) =>{
            if (exp > 0) {
                options.expiresIn = parseInt(config.EXP) * exp
            }
            try {
                return jwt.sign(data, secret, options)
            } catch (error) {
                throw error
            }
        },
        verifyCode: (data) =>{
            try {
                return jwt.verify(data, secret)
            } catch (error) {
                throw error
            }
        }
    }
}

module.exports = JWT()