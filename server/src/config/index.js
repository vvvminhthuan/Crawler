"use strict"
require('dotenv').config()

module.exports= {
    ALLOWED_ORIGINS :  process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : ["http://localhost:8088", "http://localhost:8087", 'http://localhost:8020', 'http://127.0.0.1:9000', 'http://localhost:9000'],
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
        maxAge: 24*60*60*1000, // 1 ngay
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
        CONNECT_ERR: 'connect_error',
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
    },
    MAIL: {
        USER: process.env.USER || 'dev.xda.crawler@gmail.com',
        PASSWORD: process.env.PASSWORD || 'z q c n b t m x z k y g y i q h'
    },
    URL_CLIENT: process.env.URL_CLIENT || 'http://localhost:8088/',
}