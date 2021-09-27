"use strict"
const ModelGroups = require('../Models/ModelGroups')
const ModelMessages = require('../Models/ModelMessages')
const ModelGroupUsers = require('../Models/ModelGroupUsers')
const {ROW_DELETE} = require('../Config')
const { setRes } = require('../Helpers/Response')

module.exports = {
    getListGroups: (req, res) => {
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
                setRes(res, 200, true, 'Get role complete!', result)
            })
            .catch (err => {
                setRes(res, 500, false, 'Get role fail!')
            })
    },
    createGroups: async (req, res) => {
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
        const result = await ModelGroups.createRoles(params, newAdmin, oldAdmin)
        if (result) {
            setRes(res, 201, true, 'Create role complete!', result)
        } else {
            setRes(res, 500, true, 'Create role fails!')
        }
    },
    getMessages: async (req, res) => {
        let params = req.body
        let listRoles = await ModelMessages.findAll({
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
        const result = await ModelGroups.createRoles(params, newAdmin, oldAdmin)
        if (result) {
            setRes(res, 201, true, 'Create role complete!', result)
        } else {
            setRes(res, 500, true, 'Create role fails!')
        }
    },
}