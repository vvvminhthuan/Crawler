"use strict"
const { SOCKET_EVENT, TYPE_MESSAGE } = require('../../Config')
const ModelGroupUsers = require('../../Models/ModelGroupUsers')
const ModelGroups = require('../../Models/ModelGroups')
const ModelMessages = require('../../Models/ModelMessages')
const {CREATE_UPDATE_MESSAGE} = require('../Middlewares/ValidateMessages')

const EventMessagers = () => {
    const send = (socket, groupId, userId, content) => {
        ModelMessages.create({
            groupId: groupId,
            userId: userId,
            content: content,
            type: TYPE_MESSAGE.SEND
        })
        .then((result) => {
            if (result) {
                socket.emit(`${SOCKET_EVENT.CHAT_EVENT.SEND}.${groupId}`, {
                    status: 'OK',
                    content: content
                })
            }else{
                socket.emit(`${SOCKET_EVENT.CHAT_EVENT.SEND}.${groupId}`, {
                    status: 'FAIL',
                    content: null,
                    errors: "Create message fail"
                })
            }
        }).catch((err) => {
            socket.emit(`${SOCKET_EVENT.CHAT_EVENT.SEND}.${groupId}`, {
                status: 'FAIL',
                content: null,
                errors: err + ''
            })
        })
    }
    const writing = (socket, groupId, userId) => {
        socket.emit(`${SOCKET_EVENT.CHAT_EVENT.WRITE}.${groupId}`, {
            status: 'OK',
            userId: userId
        })
    }
    const read = (socket, groupId, userId) => {
        let condition = {
            groupId: groupId,
            userId: userId
        }
        let param = {
            type: TYPE_MESSAGE.READ
        }
        ModelMessages.update(param, {
            where: condition
        })
        .then((result) => {
            socket.emit(`${SOCKET_EVENT.CHAT_EVENT.READ}.${groupId}`, {
                status: 'OK',
                userId: userId
            })
        }).catch((err) => {
            socket.emit(`${SOCKET_EVENT.CHAT_EVENT.READ}.${groupId}`, {
                status: 'FAIL',
                userId: null,
                errors: err + ''
            })
        })
    }
    const createGroup = async (params) => {
        let listUsers = []
        let users = params.users.slipt(',')
        let group = await ModelGroups.create({'name': groupName})
        if (group) {
            users.forEach(e => {
                listUsers.push({
                    'groupId': group.id,
                    'userId': group.e,
                })
            })
            let groupUser = await ModelGroupUsers.bulkCreate(listUsers)
            if (groupUser) {
                return group.id // tra ve groupId
            }
        }
        return 0
    }

    return {
        /*
            body: {
                groupId: 0, tn moi thi groupId = 0 || undefine
                users: '1,2',
                message: 'string',
            },
        */ 
        sendMessages: async (socket) => {
            socket.on(SOCKET_EVENT.CHAT_EVENT.SEND, (body, callback) => {
                let {groupId, userId, content} = body
                // neu khong co group thi tao group truoc
                if (groupId == 0 || groupId == undefined) {
                    groupId = await createGroup(content)
                    if (typeof callback == "function") {
                        callback({
                            status: 'OK',
                            groupId: groupId
                        })
                    }
                }
                CREATE_UPDATE_MESSAGE(body)
                .then((valid) => {
                    if (valid) {
                        send(socket, groupId, userId, content)
                    }
                })
                .catch((err) => {
                    console.log('Send message: ' + err)
                })
            })
        },
        /*
            {
                groupId: 0,
                userId: 0,
            }
        */
        writing: (socket) => {
            socket.on(SOCKET_EVENT.CHAT_EVENT.WRITE, (content) => {
                let {groupId, userId} = content
                writing(socket, groupId, userId)
            })
        },
        /*
            {
                groupId: 0,
                userId: 0,
            }
        */
        read: (socket) => {
            socket.on(SOCKET_EVENT.CHAT_EVENT.WRITE, (content) => {
                let {groupId, userId} = content
                read(socket, groupId, userId)
            })
        }
    }
}
module.exports = EventMessagers()