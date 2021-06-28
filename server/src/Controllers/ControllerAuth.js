"use strict"

const ModelUsers = require('../Models/ModelUsers')
const JWT = require('../Auth/JWT')
const BrcyptCode = require('../Auth/BrcyptCode')
const { TOKEN_ACCESS, TOKEN_REFRESH, EXPREFRESH, MODEL_DEV, OPTION_COKIE } = require('../Config')

module.exports = {
    login: async (req, res) => {
        let userData = req.body
        let condition = {
            where: {
                email: userData.email
            }
        }
        let userResult = await ModelUsers.findOne(condition)
        if (!userResult) {
            res.status(400)
            return res.json({
                error: 'Login fails', 
                message: 'The email not exits!',
                success: false
            })
        }
        return BrcyptCode.compareCode(userData.password, userResult.password)
        .then(value => {
            if (value) {
                let dataJwt = {
                    name: userResult.firstName + ' ' + userResult.lastName,
                    email: userResult.email
                }
                let accessToken = JWT.signCode(dataJwt)
                // let refreshToken = JWT.signCode(dataJwt, parseInt(EXPREFRESH))
                res.cookie( TOKEN_ACCESS, accessToken, OPTION_COKIE)
                // tam thoi chua can
                // res.cookie( TOKEN_REFRESH , refreshToken, { maxAge: 30*24*60*60, secure: !MODEL_DEV, httpOnly: true })
                res.status(200)
                return res.json({
                    accessToken: accessToken, 
                    // refreshToken: refreshToken, //???
                    success: true
                })
            }
            res.status(400)
            res.json({
                error: 'Login fails', 
                message: 'The email or password not correct!',
                success: false
            })
        })
        .catch(err => {
            console.log(err + '')
            res.status(404)
            res.json({
                error: 'Login fails', 
                message: 'The authorizing not correct!',
                success: false
            })
        })
    },
    logout:(req, res)  => {
        try {
            if (JWT.verifyCode(req)) {
                res.cookie( TOKEN_ACCESS, '', { maxAge: 0, secure: !MODEL_DEV, httpOnly: true })
                res.status(200)
                res.json({
                    success: true,
                    message: 'Logout complete', 
                })
            }
        } catch (error) {
            res.status(400)
            res.json({
                status: false, 
                message: 'Logout fails'
            })
        }
    },
    // Tam Thoi khong su dung, token 1d thi bi mat hieu luc
    refreshToken:(req, res) => {
        try {
            let refreshToken = req.headers.authorization.replace('Bearer ', '')
            let refresh = null
            refresh = JWT.verifyCode(refreshToken)
            if (refresh) {
                let dataJwt = {
                    name: refresh.name,
                    email: refresh.email
                }
                let accessToken = JWT.signCode(dataJwt)
                res.status(200)
                res.json({
                    accessToken: accessToken, 
                    success: true
                })
            }
            res.status(400)
            res.json({
                message: 'Get refresh token fails.', 
                success: false
            })
        } catch (error) { 
            res.status(400)
            res.json({
                error: error + '', 
                message: 'Get refresh token fails.', 
                success: false
            })
        }
    }
}