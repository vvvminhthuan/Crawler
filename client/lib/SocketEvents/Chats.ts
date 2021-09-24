import { SOCKET } from 'config/Socket'

const Chats = (socket) => {
    return {
        sendMessage : (socket, groupId = 0) => {
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
        emitMessage: (socket, message, userId, groupId) => {
            let body = {
                groupId: groupId,
                users: userId,
                message: message,
            }
            socket.emit(SOCKET.CHAT_EVENT.SEND, body)
        }
    }
}

export default Chats