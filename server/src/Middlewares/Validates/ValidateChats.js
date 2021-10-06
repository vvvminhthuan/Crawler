"use strict"

const {VALIDATOR} = require('./ValidateBasic')
const { setRes }= require('../../Helpers/Response')

module.exports = {
    CREATE_GROUPUSERS: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            users: 'required|regUsers',
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
            setRes(res, 500, false, 'Validate fails', {
                params: req.body,
                error: err + ''
            })
        })
    },
    CREATE_MESSAGES: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            groupId: 'required|string|maxLength:255',
            userId: 'required|string|maxLength:255',
            content: 'required|string|maxLength:255',
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
            setRes(res, 500, false, 'Validate fails', {
                params: req.body,
                error: err + ''
            })
        })
    }
}