"use strict"
require('dotenv').config()

module.exports= {
    PORT:  process.env.MODEL_DEV ? process.env.PORT : 443,
    MODEL_DEV:  (process.env.MODEL_DEV === 'true'),
    CRT:  'Hoang Minh THuan',
    EXPREFRESH:  process.env.exprefresh || 365,
    EXP:  process.env.exp || 86400, // 1 ngay
    SECRET:  process.env.secret || 'W7fCTtanmTX9UDE',
    ALG:  process.env.alg || 'HS384',
    SALT:  process.env.SALT || 8,
    TOKEN_REFRESH: '_PEx', // tam thoi kong can
    TOKEN_ACCESS: '_23T', // luu vao db
    OPTION_COKIE: {
        maxAge: 24*60*60*1000, 
        secure: !(process.env.MODEL_DEV === 'true'), 
        httpOnly: true 
    },
    PGUSER:  process.env.PGUSER || 'postgres',
    PGHOST:  process.env.PGHOST || 'localhost',
    PGPASSWORD:  process.env.PGPASSWORD || '1',
    PGDATABASE:  process.env.PGDATABASE || 'crawler',
    PGPORT:  process.env.PGPORT || '5432',
    PGCONNETNAME:  process.env.PGCONNETNAME || 'postgres',
    PGIDLETIMEOUT:  process.env.PGIDLETIMEOUT || 1000,
    PGMAX:  process.env.PGMAX || 30,
    ROW_DELETE: {
        NOT_DELETE: 0,
        IS_DELETE: 1,
        IS_DRAFT: 2,
    },
    TYPE_MESSAGE: {
        TEXT: 1,
        JSON: 2,
    },
    SOCKET_EVENT:  {
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
}