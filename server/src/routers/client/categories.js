"use strict"
var routes = require('express').Router()
const ControllerCategory =  require('../../controller/ControllerCategory')

routes.get('/:id?', async(req, res) => {
    let rs = await ControllerProduct.getItems(req)
    res.writeHead(200)
    res.end("hello world\n")
})
routes.post('/update', async(req, res) => {
    let rs = await ControllerProduct.updateItem(req)
    res.writeHead(200)
    res.end("hello world\n")
})
routes.post('/create', (req, res) => {
    ControllerCategory.insertItem(req, res)
})

module.exports = routes;