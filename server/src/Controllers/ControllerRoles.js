"use strict"
const ModelRoles = require('../Models/ModelRoles')

module.exports = {
    getRoles: (req, res) => {
        let params = req.params
        let condition = {
            where: {
                isDelete: 0
            }
        }
        if (params) {
            Object.assign(condition.where, params)
        }
        return ModelRoles.findAll(condition)
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
    updateRoles: async (req, res) => {
        let params = req.body
        let condition = req.params
        if (params.password) {
            params.password = await BrcyptCode.hashCode(params.password)
        }
        return ModelRoles.update(params, {
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
    createRoles: async (req, res) => {
        let params = req.body
        params.password = await BrcyptCode.hashCode(params.password)
        return ModelRoles.create(params) 
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