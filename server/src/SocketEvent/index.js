"use strict"
const chats = require('./Chats')
const notifications = require('./Notifications')
const middlewares = require('./Middlewares')
module.exports = (io) => {
    // middlewares
    middlewares(io)
    // Event chats
    chats(io)
    // Event notifition
    notifications(io)
}