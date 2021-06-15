"use strict"
const VALIDATOR = require('node-input-validator')
const ModelRoles = require('../../Models/ModelRoles')
const { ROW_DELETE } = require('../../Config')

VALIDATOR.extend('unique', async({ value, args }) => {
    let field = args[0] || 'name'
    let condition = {
        where: {
            [field]: value.trim(),
            isDelete: ROW_DELETE.NOT_DELETE
        }
    }
    let result = await ModelRoles.findAll(condition)
    return !(result.length > 0)
})

module.exports = {
    CREATE_UPDATE_ROLES: function (req, res, next) {
        let validate = new VALIDATOR.Validator(req.body, {
            name: 'required|sometimes|unique',
            roleChild: 'required|sometimes',
            createdBy: 'required|sometimes'
        },{
            'name.unique': 'The name must be a already exists address.',
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