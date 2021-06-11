"use strict"
const VALIDATOR = require('node-input-validator')
const ModelUsers = require('../../Models/ModelUsers')

VALIDATOR.extend('unique', async({ value, args }) => {
    let field = args[0] || 'email'
    let condition = {
        where: {
            [field]: value
        }
    }
    let result = await ModelUsers.findAll(condition)
    
    return !(result.length > 0)
})
module.exports = {
    CREATE_USERS: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            firstName: 'required',
            lastName: 'required',
            nickName: 'required',
            email: 'required|email|unique:email',
            password: 'required',
            phoneNumber: 'required|decimal',
            numberId: 'required|decimal',
            address: 'required',
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
            'email.unique': 'The email must be a already exists address.',
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