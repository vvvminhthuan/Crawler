"use strict"
const { SOCKET_EVENT } = require('../../Config')
const {disconnect, disconnectErrors, connectErrors} = require('../utils/CommonEvent')
const { handleSendMessages, handleWriting, handleRead } = require('./EventMessage')

module.exports = (io) => {
    io.of(`/${SOCKET_EVENT.CHAT}`)
    .on(SOCKET_EVENT.CONNECT, (socket) =>{
        console.log(`Client ID ${socket.id} connected CHAT`)

        handleSendMessages(socket)
        handleWriting(socket)
        handleRead(socket)

        disconnect(socket)
        connectErrors(socket)
        disconnectErrors(socket)
    })
}