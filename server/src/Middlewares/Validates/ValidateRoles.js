"use strict"
const {VALIDATOR} = require('./ValidateBasic')
const { setRes }= require('../../Helpers/Response')

module.exports = {
    CREATE_ROLES: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            name: 'required|uniqueRole',
            roleChild: 'required',
            createdBy: 'required'
        },{
            'name.uniqueRole': 'The name must be a already exists address.',
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
    UPDATE_ROLES: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            name: 'sometimes|uniqueRole',
            roleChild: 'sometimes',
            createdBy: 'sometimes'
        },{
            'name.uniqueRole': 'The name must be a already exists address.',
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