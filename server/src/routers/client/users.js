"use strict"
var routes = require('express').Router()
const { getUsers, createUsers, updateUsers, deleteUers, getUsersByAuth, resetPassword } = require('../../Controllers/ControllerUsers')
const　{ Auth, detectAuth } = require('../../Middlewares/MiddlewareAuth')
const　{ CREATE_USERS, UPADTE_USERS, EMAIL_EXIST, TOKEN_VERIFY } = require('../../Middlewares/Validates/ValidateUsers')
const { detectParams, validateParams } = require('../../Middlewares/MiddlewareRouters')

routes.get('/user-info', [detectAuth], (req, res) => {
    getUsersByAuth(req, res)
})
routes.get('/:id?', [detectParams, Auth], (req, res, next) => {
    getUsers(req, res)
})
routes.post('/', CREATE_USERS, (req, res) => {
    createUsers(req, res)
})
routes.put('/:id?', [detectParams, validateParams, Auth, UPADTE_USERS], (req, res) => {
    updateUsers(req, res)
})
routes.delete('/:id?', [detectParams, validateParams, Auth], (req, res) => {
    deleteUers(req, res)
})
// send mail reset password with email
routes.post('/reset-password', EMAIL_EXIST, (req, res) => {
    resetPassword(req, res)
})
routes.put('/reset-password/:token', [TOKEN_VERIFY, UPADTE_USERS], (req, res) => {
    res.end('to')
    // updateUsers(req, res)
})

module.exports = routes;