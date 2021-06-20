"use strict"
const ModelRoles = require('../Models/ModelRoles')
const { signRole, signRoleChild, renderRole } = require('../Auth/Roles')
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
        return ModelRoles.findAllRoles(condition)
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
        let condition = {
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            }
        }
        Object.assign(condition.where, req.params)
        const role = await ModelRoles.findOneRoles(condition)
        if ( role ) {
            var roleChange
            if (params.roleChild) {
                roleChange = renderRole(role.roleChild, params.roleChild)
                params.role = role.role + roleChange
                params.roleChild = signRoleChild(params.roleChild)
            }
            const result = await ModelRoles.updateRoles(condition, params, roleChange)
            if (result) {
                res.status(200)
                res.json({
                    "status": true,
                    "result": result
                })
            } else {
                res.status(500)
                res.json({
                    "status": false,
                    "message": "Insert fails.",
                })
            }
        } else {
            res.status(404)
            res.json({
                "status": false,
                "message": "Request Not Found."
            })
        }
    },
    createRoles: async (req, res) => {
        let params = req.body
        let listRoles = await ModelRoles.findAll({
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            },
            order: [
                ['role', 'DESC']
            ]
        })
        params.role = signRole(listRoles.length, params.roleChild)
        params.roleChild = signRoleChild(params.roleChild)
        // lay quyen cao nhat
        let roleMax = listRoles[0].role

        // Set lai quyen admin khi tao mot role moi
        let newAdmin = {
            role: roleMax + params.role,            
            roleChild: roleMax + params.role
        }
        let oldAdmin = {
            role: roleMax
        }
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
            isDelete: ROW_DELETE.IS_DELETE
        }
        let condition = {
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            }
        }
        Object.assign(condition.where, req.params)

        return ModelRoles.update(params, condition)
        .then(result => {
            res.status(200)
            res.json({
                "status": true,
                "result": result
            })
        })
        .catch(err => {
            res.status(500)
            res.json({
                "status": false,
                "message": "Insert fails.",
            })
        })
    },
}