import { SOCKET } from 'config/Socket'

export const handleSendMessage = (socket, userId, action) => {
    socket.on(`${SOCKET.CHAT_EVENT.SEND}.${userId}`, body => {
        action.addMessage(body.content)
        action.updateUersNumMessage({
            userId: body.content.userId,
            num: 1 
        })
    })
}
/*
    body: {
        groupId: 0, tn moi thi groupId = 0 || undefine
        users: '1,2',
        message: 'string',
    },
*/ 
export const emitMessage = (socket, params) => {
    let {message, userId, groupId, createdAt, userEmit, action} = params
    let body = {
        groupId: groupId,
        userId: userId,
        content: message,
        userEmit: userEmit,
        createdAt: createdAt
    }
    socket.emit(SOCKET.CHAT_EVENT.SEND, body, (result)=>{
        action.addMessage(result)
    })
}
/*
    body: {
        groupId: 0, tn moi thi groupId = 0 || undefine
        users: '1,2',
    },
*/ 
export const handleWriting = (socket, userId, action) => {
    socket.on(`${SOCKET.CHAT_EVENT.WRITE}.${userId}`, body =>{
        action.edit({
            groupId: body.groupId,
            edit: body.edit
        })
    })
}
/*
    body: {
        groupId: 0, tn moi thi groupId = 0 || undefine
        users: '1,2',
    },
*/ 
export const emitWriting = (socket, userId, groupId, edit) => {
    let body = {
        groupId: groupId,
        userEmit: userId,
        edit: edit
    }
    socket.emit(SOCKET.CHAT_EVENT.WRITE , body)
}
/*
    body: {
        groupId: 0, tn moi thi groupId = 0 || undefine
        users: '1,2',
    },
*/ 
export const handleRead = (socket, userId, action) => {
    socket.on(`${SOCKET.CHAT_EVENT.READ}.${userId}`, body =>{
        action.read({
            groupId: body.groupId,
            userId: userId,
            type: body.type
        })
    })
}
/*
    body: {
        groupId: 0, tn moi thi groupId = 0 || undefine
        userId: '1', ng dang nhan tin
    },
*/ 
export const emitRead = (socket, userId, groupId, createdAt, action) => {
    let body = {
        groupId: groupId,
        userId: userId,
        createdAt: createdAt,
    }
    socket.emit(`${SOCKET.CHAT_EVENT.READ}`, body, result => {
        action.read({
            groupId: result.groupId,
            userId: result.userId,
            type: result.type
        })
    })
    action.updateUersNumMessage({
        userId: userId,
        num: 0
    })
}
/*
    body: {
        groupId: 0, tn moi thi groupId = 0 || undefine
        users: '1,2',
    },
*/ 
export const handleOnline = (socket, action) => {
    socket.on(`${SOCKET.CHAT_EVENT.ONLINE}`, body =>{
        action.updateUersOnline({
            userId: body.userId,
            online: body.online
        })
    })
}
/**
 * socket dang lang nghe
 * userId id dang login vao
 * action chinh la action trong redux, nham thay doi state tuong ung
 */
export const handleAddGroup = (socket, userId, action) => {
    socket.on(`${SOCKET.CHAT_EVENT.ADD_GROUP}.${userId}`, body =>{
        let group = {
            id: body.content.userId,
            groupId: body.content.groupId
        }
        action.updateUersGroupChats(group) 
    })
}
export const test = (socket) => {
    socket.on(`send`, (fullname, objPersont) =>{
        console.log(fullname, objPersont)
    })
}