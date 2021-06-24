"use strict"

var routes = require('express').Router()
const { login, logout } = require('../Controllers/ControllerAuth')
const { USER_SIGNIN } = require('../Middlewares/Validates/ValidateAuth');

// routes.use('/admin',require('./admin'));
routes.use(require('./client'))

routes.use('/test', function (req, res, next) {
    res.io.emit('socketToMe', 'test')
    res.send('respond with a resource.')
})
routes.post('/signin', USER_SIGNIN, async (req, res, next) => {
    await login(req, res)
    res.end()
})
routes.get('/signout', async (req, res) => {
    await logout(req, res)
    res.end()
})
routes.use(function (req, res) {
    res.status(404).json({status: false, error: 'Not found 404' })
    // home edit thu choi
    // utao test conflict
})

module.exports = routes;