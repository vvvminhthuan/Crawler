"use strict"
const {VALIDATOR} = require('./ValidateBasic')
const { setRes }= require('../../Helpers/Response')

module.exports = {
    USER_SIGNIN: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            email: 'required|sometimes|email',
            password: 'required|sometimes|minLength:8|maxLength:32',
        })
        return validate.check()
        .then(matched =>{
            if (!matched) {
                setRes(res, 422, false, 'Validate fails', {
                    oldParams: req.body,
                    error: validate.errors
                })
            }else{
                next();
            }
        })
        .catch(err => {
            setRes(res, 500, false, 'Request bad!', {
                params: req.body,
            })
        })
    }
}