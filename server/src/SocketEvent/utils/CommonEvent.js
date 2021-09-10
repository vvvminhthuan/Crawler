"use strict"
const { SOCKET_EVENT } = require('../../Config')

module.exports = {
    disconnect : socket => {
        socket.on(SOCKET_EVENT.DISCONNECT, (reason)=>{
            console.log(`Client ${socket.id} disconnet: ${reason}`)
        })
    },
    disconnectErrors : socket => {
        socket.on(SOCKET_EVENT.DISCONNECT_ERR, (reason)=>{ 
            console.log(`Client ${socket.id} disconnect error: ${reason}`)
        })
    },
    connectErrors : socket => {
        socket.on(SOCKET_EVENT.CONNECT_ERR, (err)=>{
            console.log(`Client ${socket.id} connect error: ${err.message}`)
        })
    }
}