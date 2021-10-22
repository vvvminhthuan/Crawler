"use strict"
const { SOCKET_EVENT } = require('../../Config')

module.exports = {
    disconnect : (socket, callBack) => {
        socket.on(SOCKET_EVENT.DISCONNECT, (reason)=>{
            console.log(`Client ${socket.id} disconnet: ${reason}`)
            callBack()
        })
    },
    disconnectErrors : (socket, callBack) => {
        socket.on(SOCKET_EVENT.DISCONNECT_ERR, (reason)=>{ 
            console.log(`Client ${socket.id} disconnect error: ${reason}`)
            callBack()
        })
    },
    connectErrors : (socket, callBack) => {
        socket.on(SOCKET_EVENT.CONNECT_ERR, (err)=>{
            console.log(`Client ${socket.id} connect error: ${err.message}`)
            callBack()
        })
    }
}