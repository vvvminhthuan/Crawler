"use strict"
const chats = require('./Chats')
const notifications = require('./Notifications')

module.exports = (io) => {
    // Event chats
    chats(io)
    // Event notifition
    notifications(io)
}