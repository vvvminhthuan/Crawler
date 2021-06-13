"use strict"

var routes = require('express').Router()
const　{ Auth } = require('../../Middlewares/MiddlewareAuth')

routes.use('/users',require('./Users'))
routes.use('/roles', Auth, require('./Roles'))
// routes.use('/categories',require('./categories'))
// routes.use('/friend',require('./FriendRouter'));
module.exports = routes;