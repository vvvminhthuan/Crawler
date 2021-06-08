"use strict"
var routes = require('express').Router()
// const ControllerUser =  require('../../controller/ControllerUser')

// const { detectParams } = require('../..//middleware/RouterMiddleware')

const { testConnect, sequelize } = require('../../Models/ModelBase')

routes.get('/', (req, res) => {
    testConnect(Sequelize)
    res.end('Good Job')
    // ControllerUser.getItems(req, res)
})
routes.get('/update', async(req, res) => {
    // let rs = await ControllerUser.updateItem(req)
    // res.writeHead(200)
    // res.end("hello world\n")
})
routes.get('/insert', async(req, res) => {
    // let rs = await ControllerUser.insertItem(req)
    // res.writeHead(200)
    // res.end("hello world\n")
})
routes.get('/user', async(req, res) => {
    // res.writeHead(200)
    // res.end("hello world\n")
})

module.exports = routes;