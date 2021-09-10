"use strict"
const { SOCKET_EVENT } = require('../../Config')
const {disconnect, disconnectErrors, connectErrors} = require('../utils/CommonEvent')

module.exports = (io) => {
    io.of(`/${SOCKET_EVENT.NOTIFITION}`)
    .use((socket, next) => {
        console.log(socket)
        next()
    })
    .on(SOCKET_EVENT.CONNECT, (socket) =>{
        console.log('Client connected NOTIFITION')
        // notifications(io, socket)
        disconnect(socket)
        connectErrors(socket)
        disconnectErrors(socket)
    })
}