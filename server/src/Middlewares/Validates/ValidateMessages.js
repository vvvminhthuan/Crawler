"use strict"
const { Validator } = require('./ValidateBasic')
const { setRes }= require('../../Helpers/Response')

module.exports = {
    CREATE_UPDATE_MESSAGE: function (req, res, next) {
        let validate = new Validator(req.body, {
            userId: 'required',
            content: 'required|sometimes',
            type: 'required|decimal',
            createdBy: 'required'
        })
        return validate.check()
        .then(matched =>{
            if (!matched) {
                setRes(res, 400, false, 'Validate fails', {
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