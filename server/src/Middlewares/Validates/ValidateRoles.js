"use strict"
const { Validator } = require('node-input-validator')

module.exports = {
    CREATE_UPDATE_ROLES: function (req, res, next) {
        let validate = new Validator(req.body, {
            name: 'required|sometimes',
            roleValidate: 'required|sometimes',
            createdBy: 'required'
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