"use strict"
var routes = require('express').Router()
const ControllerUser =  require('../../controller/ControllerUser')

const { detectParams } = require('../..//middleware/RouterMiddleware')

routes.get('/:id?', detectParams ,(req, res) => {
    ControllerUser.getItems(req, res)
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