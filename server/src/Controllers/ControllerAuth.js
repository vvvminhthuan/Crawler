"use strict"
const ModelUser = require('../Models/ModelUsers')
const JWT = require('../Auth/JWT')
const BrcyptCode = require('../Auth/BrcyptCode')

module.exports = {
    login: async (req, res) => {
        let userData = req.body;
        let condition = [
            {AND: {email: userData.email}}
        ]
        let userResult = await ModelUser.getByCondition(condition)
        let hash = userResult.length ? userResult[0].password : '';
        BrcyptCode.compareCode(userData.password, hash)
        .then(value => {
            if (value) {
                let dataJwt = {
                    name: userResult[0].first_name + ' ' + userResult[0].last_name,
                    email: userResult[0].email
                }
                let accessToken = JWT.signCode(dataJwt);
                let expre = parseInt(process.env.exprefresh);
                let refreshToken = JWT.signCode(dataJwt, expre);
                return res.json({status: 200, accessToken: accessToken, refreshToken: refreshToken, success: value})
            }
            return res.json({status: 400, error: 'Login fails', success: value});
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
                return res.json({status: 200, message: 'Logout complete', success: true})
            }
        } catch (error) {
            res.status(403)
            return res.json({status: false, message: 'Logout fails', error: error + ''})
        }
        
        
    },
    refreshToken:(req, res) => {
        let refreshToken = req.headers.authorization.replace('Bearer ', '')
        let refresh = null
        try {
            console.log(refreshToken);
            refresh = JWT.verifyCode(refreshToken)
        } catch (error) {
            return res.json({status: 400, error: error + '', success: false})
        }
        if (refresh) {
            let dataJwt = {
                name: refresh.name,
                email: refresh.email
            }
            let accessToken = JWT.signCode(dataJwt);
            return res.json({status: 200, accessToken: accessToken, success: true})
        }
        return res.json({status: 400, error: error + '', success: false});
    }
}