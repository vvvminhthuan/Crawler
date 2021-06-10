"use strict"
const ModelUsers = require('../Models/ModelUsers')
const BrcyptCode = require('../Auth/BrcyptCode')

module.exports = {
    getItems: async (req, res) => {
        let userParam = req.params
        let condition = [
            {AND: userParam}
        ]
        let result = await ModelUsers.getByCondition(condition)
        if (result) {
            return res.json({
                result: result
            })
        } else {
            return res.json({
                "success": 0,
                'message': `can't query` 
            })
        }
        
    },
    updateUser: async (req, res) => {
        let userData = req.body
        let condition = [
            {AND:{id: userData.id}},
        ]
        if (userData.password) {
            userData.password =  await BrcyptCode.hashCode(userData.password)
        }
        ModelUsers.updateById(userData, condition)
        .then(result =>{
            res.json({
                "success": 1,
                "message": "Update success",
                "record": result
            })
        })
        .catch(err => {
            es.json({
                "success": 0,
                "message": "Update not success",
                "detail": err
            })
        })
    },
    deleteUser: async (req, res) => {
        let userData = req.body
        let condition = [
            {AND:{id: userData.id}},
        ]
        let param = {
            is_delete: 0
        }
        ModelUsers.deleteItem(param, condition)
        .then(result =>{
            res.json({
                "success": 1,
                "message": "Update success",
                "record": result
            })
        })
        .catch(err => {
            es.json({
                "success": 0,
                "message": "Update not success",
                "detail": err
            })
        })
    },
    createUser: async (req, res) => {
        let userData = req.body
        let condition = [
            {AND: { email: userData.email}}
        ]
        let hasEmail = await ModelUsers.getByCondition(condition)
        if (!hasEmail) {
            userData.password = await BrcyptCode.hashCode(userData.password)
            ModelUsers.insertItem(userData) 
            .then(result =>{
                res.json({
                    "success": 1,
                    "message": "Insert success",
                    "record": result
                })
            })
            .catch(err =>{
                res.json({
                    "success": 0,
                    "message": "Insert not success"
                })
            })  
        }else {
            res.json({
                "success": 0,
                "message": "Email is exits"
            })
        }
    }
}