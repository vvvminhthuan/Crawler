"use strict"
var routes = require('express').Router()
const { getItems } = require('../../Controllers/ControllerUsers')
const　{ Auth } = require('../../Middlewares/MiddlewareAuth')
const　{ CREATE_USERS } = require('../../Middlewares/Validates/ValidateUsers')
const { detectParams } = require('../../Middlewares/MiddlewareRouters')

routes.get('/:id?', [detectParams, Auth],async(req, res, next) => {
    let result = await getItems(req, res)
    res.end(result)
})
routes.post('/', CREATE_USERS, (req, res) => {
    res.end('post') 
})
routes.put('/', Auth, (req, res) => {
})
routes.delete('/', Auth, async(req, res) => {
})

module.exports = routes;