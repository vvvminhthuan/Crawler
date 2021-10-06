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
        let infor = req.infor
        let group = await ModelGroups.create({
            name: params.name ?? '',
            createdBy: infor.id
        })
        if (group) {
            let listUser = params.users.split(',')
            listUser = listUser.map(item => {
                return {
                    groupId: group.id,
                    userId: item
                }
            })
            ModelGroupUsers.bulkCreate(listUser)
            .then((results) => {
                if (results) {
                    setRes(res, 201, true, 'Create group chat complete!', results)
                }
            })
            .catch((err) => {
                setRes(res, 500, true, 'Create group chat fails!')
            })
        }else{
            setRes(res, 500, true, 'Create group chat fails!')
        }
    },
    getMessages: (req, res) => {
        let params = req.params
        if (!params.search) {
            Object.assign(params, {search: ''})
        }
        ModelMessages.findAllMessages(params)
        .then((result) => {
            if (result) {
                setRes(res, 201, true, 'Get messages complete!', result)
            } else {
                setRes(res, 500, true, 'Get messages fails!')
            }
        }).catch((err) => {
            setRes(res, 500, false, 'Get messages fail!')
        }) 
    },
}