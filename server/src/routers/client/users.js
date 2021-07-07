"use strict"
var routes = require('express').Router()
const { getUsers, createUsers, updateUsers, deleteUers, getUsersByAuth } = require('../../Controllers/ControllerUsers')
const　{ Auth } = require('../../Middlewares/MiddlewareAuth')
const　{ CREATE_UPADTE_USERS } = require('../../Middlewares/Validates/ValidateUsers')
const { detectParams, validateParams } = require('../../Middlewares/MiddlewareRouters')

routes.get('/user-info', [Auth], (req, res) => {
    getUsersByAuth(req, res)
})
routes.get('/:id?', [detectParams, Auth], (req, res, next) => {
    getUsers(req, res)
})
routes.post('/', CREATE_UPADTE_USERS, (req, res) => {
    createUsers(req, res)
})
routes.put('/:id?', [detectParams, validateParams, Auth, CREATE_UPADTE_USERS], (req, res) => {
    updateUsers(req, res)
})
routes.delete('/:id?', [detectParams, validateParams, Auth], (req, res) => {
    deleteUers(req, res)
})

module.exports = routes;