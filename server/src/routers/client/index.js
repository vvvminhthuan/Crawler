"use strict"

var routes = require('express').Router()

routes.use('/users',require('./Users'))
// routes.use('/products',require('./products'))
// routes.use('/categories',require('./categories'))
// routes.use('/friend',require('./FriendRouter'));
module.exports = routes;