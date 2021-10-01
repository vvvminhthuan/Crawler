"use strict"
const ModelUsers = require('../Models/ModelUsers')
const BrcyptCode = require('../Auth/BrcyptCode')
const {ROW_DELETE} = require('../Config')
const { setRes } = require('../Helpers/Response')
const { mailResetPassword } = require('../Helpers/Mailer')
const { URL_CLIENT } = require('../Config')
const JWT = require('../Auth/JWT')

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
    getUsersByAuth: async (req, res) => {
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
        let listGroup = await ModelUsers.getAllGroups()
        // console.log(listGroup)
        return ModelUsers.findAllUsers(condition, true)
            .then(result => {
                console.log(result[0])
                result.listGroup = listGroup[0]
                Object.assign(result[0].user, {
                    listGroup: listGroup[0]
                })
                setRes(res, 200, true, 'Get user complete!', result)
            })
            .catch (err => {
                setRes(res, 200, false, 'Get user fail!')
            })
    },
    resetPassword: async (req, res) => {
        let params = req.body
        let dataJwt = {
            email: params.email
        }
        let token = JWT.signCode(dataJwt)
        let data = {
            url: URL_CLIENT + 'reset-password/' + token
        }
        let result = await mailResetPassword(data, params.email)
        if (result) {
            setRes(res, 200, true, 'Send mail reset password complete!', result)
        } else {
            setRes(res, 500, false, 'Send mail reset password fails!', result)
        }
    }
}