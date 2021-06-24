"use strict"
const {VALIDATOR} = require('./ValidateBasic')

module.exports = {
    USER_SIGNIN: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            email: 'required|sometimes|email',
            password: 'required|sometimes|minLength:8|maxLength:32',
        })
        return validate.check()
        .then(matched =>{
            if (!matched) {
                res.status(400)
                res.json({
                    oldParams: req.body,
                    error: validate.errors
                })
            }else{
                next();
            }
        })
        .catch(err => {
            res.status(500)
                res.json({
                    params: req.body,
                    error: 'Request bad!'
                })
        })
    }
}