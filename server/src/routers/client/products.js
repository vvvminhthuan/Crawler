"use strict"
var routes = require('express').Router()
const ControllerProduct =  require('../../controller/ControllerProduct')

routes.get('/:id?/:name?', async(req, res) => {
    let rs = await ControllerProduct.getItems(req)
    console.log(rs);
    res.writeHead(200)
    res.end("hello world\n")
})
routes.get('/update', async(req, res) => {
    let rs = await ControllerProduct.updateItem(req)
    res.writeHead(200)
    res.end("hello world\n")
})
routes.get('/insert', async(req, res) => {
    let rs = await ControllerProduct.insertItem(req)
    res.writeHead(200)
    res.end("hello world\n")
})
routes.get('/user', async(req, res) => {
    
    res.writeHead(200)
    res.end("hello world\n")
})

module.exports = routes;