"use strict"
const ModelRoles = require('../Models/ModelRoles')
const { signRole } = require('../Auth/Roles')
const {ROW_DELETE} = require('../Config')

module.exports = {
    getRoles: (req, res) => {
        let params = req.params
        let condition = {
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            }
        }
        if (params) {
            Object.assign(condition.where, params)
        }
        return ModelRoles.findAll(condition)
            .then(result => {
                res.status(200)
                res.json({
                    "status": true,
                    "result": result
                })
            })
            .catch (err => {
                res.status(500)
                res.json({
                    "status": false,
                    'message': `Can't query`,
                    "error": err + ''
                })
            })
    },
    updateRoles: async (req, res) => {
        let params = req.body
        let condition = req.params
        return ModelRoles.update(params, {
            where: condition
        }) 
        .then(result =>{
            res.status(200)
            res.json({
                "status": true,
                "result": result
            })
        })
        .catch(err =>{
            res.status(500)
            res.json({
                "status": false,
                "message": "Insert fails",
                "error": err + ''
            })
        }) 
    },
    createRoles: async (req, res) => {
        let params = req.body
        let listRoles = await ModelRoles.findAll({
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            }
        })
        params.roleValidate = signRole(listRoles.length, params.roleValidate)
        // lay quyen cao nhat
        let roleMax = listRoles.reduce((maxValue, currentValue) => {
            if (currentValue.roleValidate > maxValue) {
                maxValue = currentValue
            }
            return maxValue
        })
        // Set lai quyen admin
        let newAdmin = {
            roleValidate: roleMax.roleValidate + params.roleValidate
        }
        let oldAdmin = {
            roleValidate: roleMax.roleValidate
        }
        console.log(roleMax.roleValidate, newAdmin, oldAdmin) 
        const result = await ModelRoles.createRoles(params, newAdmin, oldAdmin)
        if (result) {
            res.status(201)
            res.json({
                "status": true,
                "result": result
            }) 
        } else {
            res.status(500)
            res.json({
                "status": false,
                "message": "Insert fails",
            })
        }
    },
    deleteRoles: (req, res) => {
        let params = {
            isDelete: ROW_DELETE.IS_DELETE,
            roleValidate: 0
        }
        let condition = req.params
        return ModelRoles.update(params, {
            where: condition
        }) 
        .then(result =>{
            res.status(200)
            res.json({
                "status": true,
                "result": result
            })
        })
        .catch(err =>{
            res.status(500)
            res.json({
                "status": false,
                "message": "Insert fails",
                "error": err + ''
            })
        }) 
    },
}