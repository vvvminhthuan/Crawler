"use strict"

var routes = require('express').Router()
const { login, logout } = require('../Controllers/ControllerAuth')
const { USER_SIGNIN } = require('../Middlewares/Validates/ValidateAuth')
const { STORAGE_FILE } = require('../Middlewares/Storages')
const {test} = require('../Controllers/ControllerFilles');

// routes.use('/admin',require('./admin'))

routes.use(require('./client'))

routes.use('/test', function (req, res, next) {
    res.io.emit('socketToMe', 'test')
    res.send('respond with a resource.')
})
routes.post('/signin', USER_SIGNIN, (req, res, next) => {
    login(req, res)
})
routes.get('/signout', (req, res) => {
    logout(req, res)
})
routes.get('/test-file', (req, res) => {
    test(req, res)
})
routes.use(function (req, res) {
    res.status(404).json({status: false, error: 'Not found 404' }) 
})

module.exports = routes