"use strict"
const ModelUsers = require('../Models/ModelUsers')
const JWT = require('../Auth/JWT')
const BrcyptCode = require('../Auth/BrcyptCode')

module.exports = {
    login: async (req, res) => {
        let userData = req.body
        let condition = {
            where: {
                email: userData.email
            }
        }
        let userResult = await ModelUsers.findOne(condition)
        let hash = userResult.length ? userResult.password : '';
        return BrcyptCode.compareCode(userData.password, hash)
        .then(value => {
            if (value) {
                let dataJwt = {
                    name: userResult[0].first_name + ' ' + userResult[0].last_name,
                    email: userResult[0].email
                }
                let accessToken = JWT.signCode(dataJwt);
                let expre = parseInt(process.env.exprefresh);
                let refreshToken = JWT.signCode(dataJwt, expre);
                res.status(200)
                return res.json({
                    accessToken: accessToken, 
                    refreshToken: refreshToken, //???
                    success: true
                })
            }
            res.status(400)
            return res.json({
                error: 'Login fails', 
                success: false
            });
        })
        .catch(err => {
            console.log(err + '');
        });
    },
    logout:(req, res)  => {
        let accessToken = req.headers.authorization.replace('Bearer ', '')
        try {
            if (JWT.verifyCode(accessToken)) {
                res.status(200)
                return res.json({
                    success: true,
                    message: 'Logout complete', 
                })
            }
        } catch (error) {
            res.status(400)
            return res.json({status: false, message: 'Logout fails', error: error + ''})
        }
    },
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
                return res.json({
                    accessToken: accessToken, 
                    success: true
                })
            }
            res.status(400)
            return res.json({
                message: 'Get refresh token fails.', 
                success: false
            })
        } catch (error) {
            res.status(400)
            return res.json({
                error: error + '', 
                message: 'Get refresh token fails.', 
                success: false
            })
        }
    }
}