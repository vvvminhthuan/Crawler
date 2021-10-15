"use strict"
const ModelGroups = require('../Models/ModelGroups')
const ModelMessages = require('../Models/ModelMessages')
const ModelGroupUsers = require('../Models/ModelGroupUsers')
const {ROW_DELETE, SOCKET_EVENT} = require('../Config')
const { setRes } = require('../Helpers/Response')
const {emitAddGroup} = require('../SocketEvent/Chats/EventMessage')

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
    /** BODY 
     * {
     *  name: string|null,
     *  users: string,string| notnull
     * } 
     */
    createGroups: async (req, res) => {
        let params = req.body
        let infor = req.infor
        let users = params.users.replace(/( )|(　)/, '')
        users = users.split(',')
        //kiem tra xem group chat da tao chua
        let groupExists = await ModelGroupUsers.checkGroupExists(users)
        if (groupExists.length>0) {
            return setRes(res, 500, false, 'Create group chat fails! group chat is exists')
        }
        let socket = res.io.of(`/${SOCKET_EVENT.CHAT}`)
        let group = await ModelGroups.create({
            name: params.name ?? '',
            createdBy: infor.id
        })
        if (group) {
            let listUser = users.map(item => {
                return {
                    groupId: group.id,
                    userId: item.trim()
                }
            })
            ModelGroupUsers.bulkCreate(listUser)
            .then((results) => {
                if (results) {
                    let user = listUser.filter(item => item.userId != infor.id)
                    emitAddGroup(socket, user.id, user.groupId)
                    setRes(res, 201, true, 'Create group chat complete!', results)
                }
            })
            .catch((err) => {
                setRes(res, 500, false, 'Create group chat fails! create group user fails')
            })
        }else{
            setRes(res, 500, false, 'Create group chat fails! group not empty')
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