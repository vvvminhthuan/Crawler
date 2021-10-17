"use strict"
var routes = require('express').Router()
const { getListGroups, getMessages, createGroups} = require('../../Controllers/ControllerChats')
const　{ detectAuth } = require('../../Middlewares/MiddlewareAuth')
const { detectParams } = require('../../Middlewares/MiddlewareRouters')
const {CREATE_GROUPUSERS} = require('../../Middlewares/Validates/ValidateChats');

routes.get('/messages/:groupId?/:userId?/:search?', [detectParams, detectAuth], (req, res, next) => {
    getMessages(req, res)
})
routes.get('/group/:userId?', [detectParams, detectAuth], (req, res, next) => {
    getListGroups(req, res)
})
routes.post('/group', [detectAuth, CREATE_GROUPUSERS], (req, res, next) => {
    createGroups(req, res)
})

module.exports = routes