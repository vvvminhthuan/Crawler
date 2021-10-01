"use strict"
var routes = require('express').Router()
const { getListGroups, getMessages, createGroups} = require('../../Controllers/ControllerChats')
const　{ detectAuth } = require('../../Middlewares/MiddlewareAuth')
const { detectParams } = require('../../Middlewares/MiddlewareRouters')

routes.get('/messages/:groupId', [detectParams, detectAuth], (req, res) => {
    getMessages(req, res)
})
routes.get('/group/:userId', [detectParams, detectAuth], (req, res) => {
    getListGroups(req, res)
})
routes.post('/group', detectAuth, (req, res) => {
    createGroups(req, res)
})

module.exports = routes