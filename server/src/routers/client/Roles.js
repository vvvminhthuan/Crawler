"use strict"
var routes = require('express').Router()
const { getRoles, createRoles, updateRoles, deleteRoles } = require('../../Controllers/ControllerRoles')
const { CREATE_UPDATE_ROLES } = require('../../Middlewares/Validates/ValidateRoles')
const { detectParams } = require('../../Middlewares/MiddlewareRouters')

routes.get('/:id?', detectParams, async(req, res) => {
    let result = await getRoles(req, res)
    res.end(result)
})
routes.put('/:id?', [detectParams, CREATE_UPDATE_ROLES], async (req, res, next) => {
    let result = await updateRoles(req, res)
    res.end(result)
})
routes.post('/', CREATE_UPDATE_ROLES, async (req, res, next) => {
    let result = await createRoles(req, res)
    res.end(result)
})
routes.delete('/:id?', detectParams, async (req, res, next) => {
    let result = await deleteRoles(req, res)
    res.end(result)
})

module.exports = routes;