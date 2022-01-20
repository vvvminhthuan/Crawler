"use strict"

var routes = require('express').Router()
const { login, logout } = require('../Controllers/ControllerAuth')
const { USER_SIGNIN } = require('../Middlewares/Validates/ValidateAuth')
const { STORAGE_FILE } = require('../Middlewares/Storages')

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
routes.get('/test-file', STORAGE_FILE.single('file'),(req, res) => {
    res.end(req.file) 
})

routes.use(function (req, res) {
    res.status(404).json({status: false, error: 'Not found 404' }) 
})

module.exports = routes