export const SOCKET = {
    URL: process.env.NEXT_PUBLIC_URL_SOCKET ?? '//localhost:8484',
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    DISCONNECT_ERR: 'disconnect_error',
    CHAT: 'CHAT',
    CHAT_EVENT: {
        READ: 'READ',
        WRITE: 'WRITE',
        SEND: 'SEND',
        RECEIVES: 'RECEIVES',
    },
    NOTIFITION: 'NOTIFITION',
    NOTIFITION_EVENT: {
        PUSH_NOTIFI: 'PUSH_NOTIFI',
        PUSH_CHAT: 'PUSH_CHAT',
    }
}