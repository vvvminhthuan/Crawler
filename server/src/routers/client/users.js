"use strict"
var routes = require('express').Router()
// const ControllerUser =  require('../../controller/ControllerUser')

// const { detectParams } = require('../..//middleware/RouterMiddleware')

const { Sequelize } = require('../../Models/ModelBase')

routes.get('/', async (req, res) => {
    try {
        await Sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
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