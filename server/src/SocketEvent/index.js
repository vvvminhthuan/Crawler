"use strict"

const { SOCKET_EVENT } = require('../Config');
const chats = require('./chats')
const notifications = require('./notifications')

module.exports = (io) => {
    // middelware auth
    io.use()
    io.of(`/${SOCKET_EVENT.CHAT}`).on(SOCKET_EVENT.CONNECT, (socket) =>{
        // console.log('Client connected')
        chats(io, socket)
        disconnect(socket)
    })
    io.of(`/${SOCKET_EVENT.NOTIFITION}`).on(SOCKET_EVENT.CONNECT, (socket) =>{
        // console.log('Client connected')
        notifications(io, socket)
        disconnect(socket)
    })
}

const disconnect = socket => {
    socket.on(SOCKET_EVENT.DISCONNECT, (reason)=>{
        console.log('client disconnet:', reason)
    })
}