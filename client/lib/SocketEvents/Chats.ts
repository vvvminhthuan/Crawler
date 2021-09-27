import { SOCKET } from 'config/Socket'

export default {
    handleSendMessage : (socket, groupId = 0) => {
        socket.on(`${SOCKET.CHAT_EVENT.SEND}.${groupId}`, body => {
            return body
        })
    },
    /*
        body: {
            groupId: 0, tn moi thi groupId = 0 || undefine
            users: '1,2',
            message: 'string',
        },
    */ 
    emitMessage : (socket, message, userId, groupId) => {
        let body = {
            groupId: groupId,
            users: userId,
            message: message,
        }
        socket.emit(SOCKET.CHAT_EVENT.SEND, body)
    },
    /*
        body: {
            groupId: 0, tn moi thi groupId = 0 || undefine
            users: '1,2',
        },
    */ 
    handleWriting : (socket, groupId) => {
        socket.on(`${SOCKET.CHAT_EVENT.WRITE}.${groupId}`, body =>{
            return body
        })
    },
    /*
        body: {
            groupId: 0, tn moi thi groupId = 0 || undefine
            users: '1,2',
        },
    */ 
    emitWriting : (socket, userId, groupId) => {
        let body = {
            groupId: groupId,
            users: userId,
        }
        socket.emit(SOCKET.CHAT_EVENT.SEND, body)
    },
    /*
        body: {
            groupId: 0, tn moi thi groupId = 0 || undefine
            users: '1,2',
        },
    */ 
    handleRead : (socket, groupId) => {
        socket.on(`${SOCKET.CHAT_EVENT.READ}.${groupId}`, body =>{
            return body
        })
    },
    /*
        body: {
            groupId: 0, tn moi thi groupId = 0 || undefine
            users: '1,2',
        },
    */ 
    emitRead : (socket, userId, groupId) => {
        let body = {
            groupId: groupId,
            users: userId,
        }
        socket.emit(`${SOCKET.CHAT_EVENT.SEND}.${groupId}`, body)
    },
    /*
        body: {
            groupId: 0, tn moi thi groupId = 0 || undefine
            users: '1,2',
        },
    */ 
    handleOnline : (socket, groupId) => {
        socket.on(`${SOCKET.CHAT_EVENT.ONLINE}.${groupId}`, body =>{
            return body
        })
    },
    /*
        body: {
            groupId: 0, tn moi thi groupId = 0 || undefine
            users: '1,2',
        },
    */ 
    emitOnline : (socket, userId, groupId) => {
        let body = {
            groupId: groupId,
            users: userId,
        }
        socket.emit(SOCKET.CHAT_EVENT.SEND, body)
    },
}