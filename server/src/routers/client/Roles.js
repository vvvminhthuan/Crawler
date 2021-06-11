"use strict"
var routes = require('express').Router()
const { getItems } = require('../../Controllers/ControllerRoles')
const { CREATE_ROLES } = require('../../Middlewares/Validates/ValidateRoles')
const { detectParams } = require('../../Middlewares/MiddlewareRouters')
const　{ Auth } = require('../../Middlewares/MiddlewareAuth')

routes.get('/:id?', [detectParams, Auth], async(req, res) => {
    let result = await getItems(req, res)
    res.end(result)
})
routes.put('/', (req, res) => {
    res.end("hello world\n")
})
routes.post('/', CREATE_ROLES, (req, res) => {
    res.end("hello world\n")
})

module.exports = routes;