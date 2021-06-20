"use strict"
const {VALIDATOR} = require('./ValidateBasic')

module.exports = {
    CREATE_UPDATE_ROLES: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            name: 'required|sometimes|uniqueRole',
            roleChild: 'required|sometimes',
            createdBy: 'required|sometimes'
        },{
            'name.uniqueRole': 'The name must be a already exists address.',
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