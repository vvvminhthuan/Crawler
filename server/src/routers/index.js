"use strict"

var routes = require('express').Router()
const { login, logout} = require('../Controllers/ControllerAuth');

// routes.use('/admin',require('./admin'));
routes.use(require('./client'))

routes.use('/test', function (req, res, next) {
    res.io.emit('socketToMe', 'test')
    res.send('respond with a resource.')
})
routes.post('/singin', async (req, res) => {
    login(req, res)
})
routes.post('/singout', async (req, res) => {
    logout(req, res)
})
routes.use(function (req, res) {
    res.status(404).json({status: false, error: 'Not found 404' })
    // home edit thu choi
    // utao test conflict
})

module.exports = routes;