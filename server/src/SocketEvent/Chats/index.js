"use strict"
const { SOCKET_EVENT } = require('../../Config')
const {disconnect, disconnectErrors, connectErrors} = require('../utils/CommonEvent')

module.exports = (io) => {
    io.of(`/${SOCKET_EVENT.CHAT}`)
    .use((socket, next) => {
        console.log('middelware')
        next()
    })
    .on(SOCKET_EVENT.CONNECT, (socket) =>{
        // console.log(socket.request.headers.cookie)
        // console.log(socket.handshake.auth)
        
        console.log(`Client ID ${socket.id} connected CHAT `)
        // chats(io, socket)
        disconnect(socket)
        connectErrors(socket)
        disconnectErrors(socket)
    })
}