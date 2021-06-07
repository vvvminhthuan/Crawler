'user strict'
const { SECRET, EXP, ALG } = require('../Config')
const jwt = require('jsonwebtoken')

const JWT = () => {
    var options = {
        algorithm: ALG,
        expiresIn: parseInt(EXP),
    }
    return {
        signCode: (data, exp = 0) =>{
            if (exp > 0) {
                options.expiresIn = parseInt(EXP) * exp
            }
            try {
                return jwt.sign(data, SECRET, options)
            } catch (error) {
                throw error
            }
        },
        verifyCode: (data) =>{
            try {
                return jwt.verify(data, SECRET)
            } catch (error) {
                throw error
            }
        }
    }
}

module.exports = JWT()