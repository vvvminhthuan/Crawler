"use strict"

const { SOCKET_EVENT } = require('../Config');
const chats = require('./Chats')
const notifications = require('./Notifications')

module.exports = (io) => {
    io.use((socket, next) =>{
        console.log(socket.request.headers.cookie, next, socket)
        next()
    }) 
    // Event chats
    io.of(`/${SOCKET_EVENT.CHAT}`).on(SOCKET_EVENT.CONNECT, (socket) =>{
        // console.log(socket.request.headers.cookie)
        console.log(socket.handshake.auth)
        console.log(`Client ID ${socket.id} connected CHAT `)
        // chats(io, socket)
        disconnect(socket)
        connectErrors(socket)
        disconnectErrors(socket)
    })
    
    // Event notifition
    io.of(`/${SOCKET_EVENT.NOTIFITION}`).on(SOCKET_EVENT.CONNECT, (socket) =>{
        console.log('Client connected NOTIFITION')
        // notifications(io, socket)
        disconnect(socket)
        connectErrors(socket)
    })
}

const disconnect = socket => {
    socket.on(SOCKET_EVENT.DISCONNECT, (reason)=>{
        console.log(`Client ${socket.id} disconnet: ${reason}`)
    })
}
const disconnectErrors = socket => {
    socket.on(SOCKET_EVENT.DISCONNECT_ERR, (reason)=>{ 
        console.log(`Client ${socket.id} disconnect error: ${reason}`)
    })
}
const connectErrors = socket => {
    socket.on(SOCKET_EVENT.CONNECT_ERR, (err)=>{
        console.log(`Client ${socket.id} connect error: ${err.message}`)
    })
}