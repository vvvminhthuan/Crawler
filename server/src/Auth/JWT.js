'user strict'

const { SECRET, EXP, ALG, TOKEN_REFRESH, TOKEN_ACCESS } = require('../Config')
const jwt = require('jsonwebtoken')

const JWT = () => {
    var options = {
        algorithm: ALG,
        expiresIn: parseInt(EXP),
    }
    const getToken = (req) => {
        let token = ''
        if (req.headers.cookie) {
            let arrCookies = req.headers.cookie.split(';')
            arrCookies.forEach((item, index) => {
                if (item.indexOf(TOKEN_ACCESS) > -1) {
                    token = item.replace(TOKEN_ACCESS+'=', '').trim()
                }
            })
        }
        if (token == '' && req.headers.authorization) {
            token = req.headers.authorization.replace('Bearer ', '')
        }
        return token
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
                let token = getToken(req)
                if (token) {
                    return jwt.verify(token, SECRET)
                }
                return false
            } catch (error) {
                return false
                throw error
            }
        }
    }
}

module.exports = JWT()