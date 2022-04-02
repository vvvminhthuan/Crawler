"use strict"
var routes = require('express').Router()
const { getRoles, createRoles, updateRoles, deleteRoles } = require('../../Controllers/ControllerRoles')
const { CREATE_ROLES, UPDATE_ROLES } = require('../../Middlewares/Validates/ValidateRoles')
const { detectParams, validateParams } = require('../../Middlewares/MiddlewareRouters')
const { Auth } = require('../../Middlewares/MiddlewareAuth')

routes.get('/role-tree/', [detectParams, Auth], (req, res) => {
    req.params.isTree = true
    getRoles(req, res)
})
routes.get('/:id?', [detectParams, Auth], (req, res) => {
    getRoles(req, res)
})
routes.put('/:id?', [detectParams, validateParams, UPDATE_ROLES, Auth], (req, res, next) => {
    updateRoles(req, res)
})
routes.post('/', [CREATE_ROLES, Auth], (req, res, next) => {
    createRoles(req, res)
})
routes.delete('/:id?', [detectParams, validateParams, Auth], (req, res, next) => {
    deleteRoles(req, res)
})

module.exports = routes