"use strict"

const {VALIDATOR} = require('./ValidateBasic')

module.exports = {
    CREATE_UPADTE_USERS: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            firstName: 'required|sometimes',
            lastName: 'required|sometimes',
            nickName: 'required|sometimes',
            email: 'required|email|uniqueUsers:email|sometimes',
            password: 'required|sometimes',
            passwordComfirm: 'required|same:password|sometimes',
            phoneNumber: 'required|phoneNumber|decimal|sometimes',
            numberId: 'required|decimal|sometimes',
            address: 'required|sometimes',
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
                    error: err + ''
                })
        })
    }
}