"use strict"
const { SOCKET_EVENT, TYPE_MESSAGE } = require('../../Config')
const ModelUsers = require('../../Models/ModelUsers')
const ModelMessages = require('../../Models/ModelMessages')
const {CREATE_UPDATE_MESSAGE} = require('../Middlewares/ValidateMessages')

const EventMessagers = () => {
    const send = (_io, groupId, userId, content, userEmit, callback) => {
        ModelMessages.create({
            groupId: groupId,
            userId: userId,
            content: content,
            type: TYPE_MESSAGE.SEND,
            createdBy: userId
        })
        .then((result) => {
            if (result) {
                _io.of(`/${SOCKET_EVENT.CHAT}`).emit(`${SOCKET_EVENT.CHAT_EVENT.SEND}.${userEmit}`, {
                    status: 'OK',
                    content: {
                        id: result.id,
                        groupId: groupId,
                        userId: userId,
                        content: content,
                        type: result.type,
                        createdAt: result.createdAt
                    }
                })
                callback({
                    id: result.id,
                    groupId: groupId,
                    userId: userId,
                    content: content,
                    type: result.type,
                    createdAt: result.createdAt
                })
            }
        }).catch((err) => {
            console.log('LOI send: ', err + '')
        })
    }
    const writing = (_io, groupId, userEmit) => {
        _io.of(`/${SOCKET_EVENT.CHAT}`).emit(`${SOCKET_EVENT.CHAT_EVENT.WRITE}.${userEmit}`, {
            status: 'OK',
            userId: userId
        })
    }
    const read = (_io, groupId, userEmit, createdAt, callback) => {
        let condition = {
            groupId: groupId,
            userId: userEmit,
            createdAt: createdAt
        }
        let params = {
            type: TYPE_MESSAGE.READ
        }
        ModelMessages.updateReaded(params, condition)
        .then((result) => {
            if (result) {
                _io.of(`/${SOCKET_EVENT.CHAT}`).emit(`${SOCKET_EVENT.CHAT_EVENT.READ}.${userEmit}`, {
                    status: 'OK',
                    groupId: groupId,
                    type: TYPE_MESSAGE.READ
                })
                callback({
                    groupId: groupId,
                    userId: userEmit,
                    type: TYPE_MESSAGE.READ,
                })
            }
        }).catch((err) => {
            console.log('LOI read: ', err + '')
        })
    }
    const _online = (_io, groupId, userId, _online, userEmit) => {
        let condition = {
            userId: userId
        }
        let param = {
            online: _online
        }
        ModelUsers.update(param, {
            where: condition
        })
        .then((result) => {
            if (result) {
                _io.of(`/${SOCKET_EVENT.CHAT}`).emit(`${SOCKET_EVENT.CHAT_EVENT.ONLINE}.${userEmit}`, {
                    status: 'OK',
                    userId: userId,
                    online: _online
                })
            }
        }).catch((err) => {
            console.log('LOI _online: ', err + '')
        })
    }

    return {
        /*
            body: {
                groupId: 0, tn moi thi groupId = 0 || undefine
                users: '1,2',
                message: 'string',
            },
        */ 
        handleSendMessages: (socket, _io) => {
            socket.on(SOCKET_EVENT.CHAT_EVENT.SEND, (body, callback) => {
                let {groupId, userId, content, userEmit} = body
                CREATE_UPDATE_MESSAGE(body)
                .then((valid) => {
                    if (valid) {
                        send(_io, groupId, userId, content, userEmit, callback)
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
        handleWriting: (socket, _io) => {
            socket.on(SOCKET_EVENT.CHAT_EVENT.WRITE, (content) => {
                let {groupId, userId} = content
                writing(_io, groupId, userId)
            })
        },
        /*
            {
                groupId: 0,
                userId: 0,
            }
        */
        handleRead: (socket, _io) => {
            socket.on(SOCKET_EVENT.CHAT_EVENT.READ, ({groupId, userId, createdAt}, callback) => {
                read(_io, groupId, userId, createdAt, callback)
            })
        },
        /*
            {
                groupId: 0,
                userId: 0,
            }
        */
        handleOnline: (socket, _io) => {
            socket.on(SOCKET_EVENT.CHAT_EVENT.ONLINE, (content) => {
                let {groupId, userId, online} = content
                _online(_io, groupId, userId, online)
            })
        },
        /**
         * 
         */
        emitAddGroup: (_io, userId, group) => {
            _io.of(`/${SOCKET_EVENT.CHAT}`).emit(`${SOCKET_EVENT.CHAT_EVENT.ADD_GROUP}.${userId}`, {
                status: 'OK',
                content: group
            })
        }
    }
}
module.exports = EventMessagers()