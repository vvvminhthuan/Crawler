"use strict"
const ModelUsers = require('../Models/ModelUsers')
const BrcyptCode = require('../Auth/BrcyptCode')
const {ROW_DELETE} = require('../Config')
const { setRes } = require('../Helpers/Response')

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
        return ModelUsers.findAllUsers(condition)
            .then(result => {
                setRes(res, 200, true, 'Get user complete!', result)
            })
            .catch (err => {
                setRes(res, 500, false, 'Get user fail!')
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
            setRes(res, 200, true, 'Update user complete!', result)
        })
        .catch(err =>{
            setRes(res, 500, false, 'Update user fails!')
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
            setRes(res, 200, true, 'Delete user complete!', result)
        })
        .catch(err =>{
            setRes(res, 500, false, 'Delete user fails!')
        }) 
    },
    createUsers: async (req, res) => {
        let params = req.body
        params.password = await BrcyptCode.hashCode(params.password)
        return ModelUsers.create(params) 
        .then(result =>{
            setRes(res, 201, true, 'Create user complete!', result)
        })
        .catch(err =>{
            setRes(res, 500, false, 'Create user fails!')
        }) 
    },
    getUsersByAuth: (req, res) => {
        let infor = req.infor
        let condition = {
            where: {
                isDelete: ROW_DELETE.NOT_DELETE
            }
        }
        if (infor) {
            Object.assign(condition.where, {id: infor.id})
        }else{
            return setRes(res, 200, false, 'Get user fail!')
        }
        return ModelUsers.findAllUsers(condition, true)
            .then(result => {
                setRes(res, 200, true, 'Get user complete!', result)
            })
            .catch (err => {
                setRes(res, 200, false, 'Get user fail!')
            })
    },
}