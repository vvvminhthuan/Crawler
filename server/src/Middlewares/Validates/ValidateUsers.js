"use strict"

const {VALIDATOR} = require('./ValidateBasic')
const { setRes }= require('../../Helpers/Response')

module.exports = {
    CREATE_USERS: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            firstName: 'required|string|maxLength:255',
            lastName: 'required|string|maxLength:255',
            nickName: 'required|string|maxLength:255',
            birthDate: 'required|date',
            gender: 'required|decimal',
            email: 'required|email|uniqueUsers:email|maxLength:255',
            password: 'required|same:passwordConfirm|maxLength:255|minLength:6',
            passwordConfirm: 'required|maxLength:255|minLength:6',
            phoneNumber: 'required|phoneNumber|decimal|maxLength:14',
            numberId: 'required|decimal|maxLength:12|minLength:9',
            address: 'required|string|maxLength:255',
        },{
            // 'firstName.required': 'firstName là trường bắt buộc',
            // 'lastName.required': 'lastName là trường bắt buộc',
            // 'nickName.required': 'nickName là trường bắt buộc',
            // 'email.required': 'email là trường bắt buộc',
            // 'email.email': 'email sai định dạng',
            // 'password.required': 'password là trường bắt buộc',
            // 'phoneNumber.required': 'phoneNumber là trường bắt buộc',
            // 'numberId.required': 'numberId là trường bắt buộc',
            // 'address.required': 'address là trường bắt buộc',
            'email.uniqueUsers': 'The email must be a already exists address.',
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
    UPADTE_USERS: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            firstName: 'sometimes|string|maxLength:255',
            lastName: 'sometimes|string|maxLength:255',
            nickName: 'sometimes|string|maxLength:255',
            birthDate: 'sometimes|date',
            gender: 'sometimes|decimal',
            email: 'email|uniqueUsers:email|sometimes|maxLength:255',
            password: 'sometimes|same:passwordConfirm|maxLength:255|minLength:6',
            passwordConfirm: 'sometimes|maxLength:255|minLength:6',
            phoneNumber: 'phoneNumber|decimal|sometimes|maxLength:14',
            numberId: 'decimal|sometimes|maxLength:12|minLength:9',
            address: 'sometimes|string|maxLength:255',
        },{
            // 'firstName.required': 'firstName là trường bắt buộc',
            // 'lastName.required': 'lastName là trường bắt buộc',
            // 'nickName.required': 'nickName là trường bắt buộc',
            // 'email.required': 'email là trường bắt buộc',
            // 'email.email': 'email sai định dạng',
            // 'password.required': 'password là trường bắt buộc',
            // 'phoneNumber.required': 'phoneNumber là trường bắt buộc',
            // 'numberId.required': 'numberId là trường bắt buộc',
            // 'address.required': 'address là trường bắt buộc',
            'email.uniqueUsers': 'The email must be a already exists address.',
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