"use strict"

const {VALIDATOR} = require('./ValidateBasic')
const { setRes }= require('../../Helpers/Response')

module.exports = {
    CREATE_UPADTE_USERS: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            firstName: 'required|sometimes|string',
            lastName: 'required|sometimes|string',
            nickName: 'required|sometimes|string',
            birthDate: 'required|sometimes|date',
            gender: 'required|sometimes|decimal',
            email: 'required|email|uniqueUsers:email|sometimes',
            password: 'required|sometimes|same:passwordConfirm',
            passwordConfirm: 'required|sometimes',
            phoneNumber: 'required|phoneNumber|decimal|sometimes',
            numberId: 'required|decimal|sometimes',
            address: 'required|sometimes|string',
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