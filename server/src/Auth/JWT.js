'user strict'
const { SECRET, EXP, ALG, TOKEN_REFRESH, TOKEN_ACCESS } = require('../Config')
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
        verifyCode: (req) =>{
            try {
                let accessToken = null
                if (req.headers.cookie) {
                    let arrCookies = req.headers.cookie.split(';')
                    arrCookies.forEach(item => {
                        if (item.indexOf(TOKEN_ACCESS)) {
                            accessToken = item.replace(TOKEN_ACCESS+'=')
                        }
                    });
                }
                accessToken = req.headers.authorization.replace('Bearer ', '')
                return jwt.verify(data, SECRET)
            } catch (error) {
                throw error
            }
        }
    }
}

module.exports = JWT()