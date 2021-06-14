"use strict"
const ModelUsers = require('../Models/ModelUsers')
const BrcyptCode = require('../Auth/BrcyptCode')
const {ROW_DELETE} = require('../Config')

module.exports = {
    getUsers: (req, res) => {
        let params = req.params
        let condition = {
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            }
        }
        if (params) {
            Object.assign(condition.where, params)
        }
        return ModelUsers.findAll(condition)
            .then(result => {
                res.status(200)
                res.json({
                    "status": true,
                    "result": result
                })
            })
            .catch (err => {
                res.status(500)
                res.json({
                    "status": false,
                    'message': `Can't query`,
                    "error": err + ''
                })
            })
    },
    updateUsers: async (req, res) => {
        let params = req.body
        let condition = req.params
        if (params.password) {
            params.password = await BrcyptCode.hashCode(params.password)
        }
        return ModelUsers.update(params, {
            where: condition
        }) 
        .then(result =>{
            res.status(200)
            res.json({
                "status": true,
                "result": result
            })
        })
        .catch(err =>{
            res.status(500)
            res.json({
                "status": false,
                "message": "Insert fails",
                "error": err + ''
            })
        }) 
    },
    deleteUers: (req, res) => {
        let params = {
            isDelete: ROW_DELETE.IS_DELETE
        }
        let condition = req.params
        return ModelUsers.update(params, {
            where: condition
        }) 
        .then(result =>{
            res.status(200)
            res.json({
                "status": true,
                "result": result
            })
        })
        .catch(err =>{
            res.status(500)
            res.json({
                "status": false,
                "message": "Insert fails",
                "error": err + ''
            })
        }) 
    },
    createUsers: async (req, res) => {
        let params = req.body
        params.password = await BrcyptCode.hashCode(params.password)
        return ModelUsers.create(params) 
        .then(result =>{
            res.status(201)
            res.json({
                "status": true,
                "result": result
            }) 
        })
        .catch(err =>{
            res.status(500)
            res.json({
                "status": false,
                "message": "Insert fails",
                "error": err + ''
            })
        }) 
    }
}