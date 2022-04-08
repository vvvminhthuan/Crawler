"use strict"
const {ModelRoles} = require('../Models')
const { signRole, signRoleChild, renderRole } = require('../Auth/Roles')
const {ROW_DELETE} = require('../Config')
const { setRes } = require('../Helpers/Response')

module.exports = {
    getRoles: (req, res) => {
        let params = req.params
        let infor = req.infor
        let condition = {
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            }
        }
        if (params) {
            Object.assign(condition.where, params)
        }
        if (params.isTree) {
            return ModelRoles.getRolesByTree(infor.roleId)
                .then(result => {
                    setRes(res, 200, true, 'Get role complete!', result)
                })
                .catch (err => {
                    setRes(res, 500, false, 'Get role fail!')
                })
        } else {
            return ModelRoles.findAllRoles(condition)
                .then(result => {
                    setRes(res, 200, true, 'Get role complete!', result)
                })
                .catch (err => {
                    setRes(res, 500, false, 'Get role fail!')
                })
        }        
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
                setRes(res, 200, true, 'Update role complete!', result)
            } else {
                setRes(res, 500, true, 'Update role fails!', result)
            }
        } else {
            setRes(res, 404, true, 'Request Not Found.', result)
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
            setRes(res, 201, true, 'Create role complete!', result)
        } else {
            setRes(res, 500, true, 'Create role fails!')
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
            setRes(res, 200, true, 'Delete role complete!', result)
        })
        .catch(err => {
            setRes(res, 500, true, 'Delete role fails!')
        })
    },
}