"use strict"
require('dotenv').config()

const PORT = process.env.MODEL_DEV ? process.env.PORT : 443
const MODEL_DEV = process.env.MODEL_DEV || true
const CRT = 'Hoang Minh THuan'
const EXPREFRESH = process.env.exprefresh || 30
const EXP = process.env.exp || 86400
const SECRET = process.env.secret || 'W7fCTtanmTX9UDE'
const ALG = process.env.alg || 'HS256'
const SALT = process.env.SALT || 8

const PGIDLETIMEOUT = process.env.PGIDLETIMEOUT || 1000
const PGMAX = process.env.PGMAX || 30

const SOCKET_EVENT = {
    CONNECT: 'connection',
    DISCONNECT: 'disconnect',
    DISCONNECT_ERR: 'disconnect_error',
    CHAT: 'chat',
    CHAT_EVENT: {
        READ: 'read',
        WRITE: 'write',
        SEND: 'send',
        RECEIVES: 'receives',
    },
    NOTIFITION: 'notifition',
    NOTIFITION_EVENT: {
        PUSH_NOTIFI: 'push_notifi',
        PUSH_CHAT: 'push_chat',
    }
}

module.exports = {
    PORT,
    CRT,
    EXPREFRESH,
    EXP,
    SECRET,
    ALG,
    SALT,
    PGIDLETIMEOUT,
    PGMAX,
    MODEL_DEV,
    SOCKET_EVENT,
}