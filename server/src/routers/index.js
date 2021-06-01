"use strict"

const { json } = require('body-parser')

var routes = require('express').Router()

// routes.use('/admin',require('./admin'));
// routes.use('/client',require('./client'))
routes.use('/', function (req, res, next) {
    res.json({mese: 'goode jod'})
})

routes.use('/test', function (req, res, next) {
    res.io.emit('socketToMe', 'test')
    res.send('respond with a resource.')
})
routes.use(function (req, res) {
    res.status(404).json({status:404, error: 'Not found 404' })
})

module.exports = routes;