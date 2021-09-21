"use strict"
const { SOCKET_EVENT } = require('../../Config')
const JWT = require('../../Auth/JWT')
const {disconnect, disconnectErrors, connectErrors} = require('../utils/CommonEvent')
const middlewares = require('../Middlewares')

module.exports = (io) => {
    middlewares(io)
    io.on(SOCKET_EVENT.CONNECT, (socket) =>{
        console.log(`Client ID ${socket.id} connected CHAT`)
        // chats(io, socket)
        disconnect(socket)
        connectErrors(socket)
        disconnectErrors(socket)
    })
}