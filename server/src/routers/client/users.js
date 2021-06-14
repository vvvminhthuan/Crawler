"use strict"
var routes = require('express').Router()
const { getUsers, createUsers, updateUsers, deleteUers } = require('../../Controllers/ControllerUsers')
const　{ Auth } = require('../../Middlewares/MiddlewareAuth')
const　{ CREATE_UPADTE_USERS } = require('../../Middlewares/Validates/ValidateUsers')
const { detectParams } = require('../../Middlewares/MiddlewareRouters')

routes.get('/:id?', [detectParams, Auth],async(req, res, next) => {
    let result = await getUsers(req, res)
    res.end(result)
})
routes.post('/', CREATE_UPADTE_USERS, async(req, res) => {
    let result = await createUsers(req, res)
    res.end(result)
})
routes.put('/:id?', [detectParams, Auth, CREATE_UPADTE_USERS], async(req, res) => {
    let result = await updateUsers(req, res)
    res.end(result)
})
routes.delete('/:id?', [detectParams, Auth], async(req, res) => {
    let result = await deleteUers(req, res)
    res.end(result)
})

module.exports = routes;