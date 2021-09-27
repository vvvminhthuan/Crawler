"use strict"
const { SOCKET_EVENT } = require('../../Config')
const JWT = require('../../Auth/JWT')

module.exports = (io) => {
    io.of(`/${SOCKET_EVENT.CHAT}`)
    .use((socket, next) => {
        if (!JWT.verifyCode(socket.handshake)) {
            socket.disconnect()
            next(new Error('The authorizing not correct!'))
        }else {
            console.log('The authorizing correct!')
            next()
        }
    })
}