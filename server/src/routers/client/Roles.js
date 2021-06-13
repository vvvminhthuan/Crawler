"use strict"
var routes = require('express').Router()
const { getRoles } = require('../../Controllers/ControllerRoles')
const { CREATE_ROLES } = require('../../Middlewares/Validates/ValidateRoles')
const { detectParams } = require('../../Middlewares/MiddlewareRouters')

routes.get('/:id?', detectParams, async(req, res) => {
    let result = await getRoles(req, res)
    res.end(result)
})
routes.put('/', (req, res) => {
    res.end("hello world\n")
})
routes.post('/', CREATE_ROLES, (req, res) => {
    res.end("hello world\n")
})

module.exports = routes;