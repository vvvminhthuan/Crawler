"use strict"
const VALIDATOR = require('node-input-validator')
const { Validator } = require('node-input-validator')

const ModelUsers = require('../../Models/ModelUsers')
const ModelRoles = require('../../Models/ModelRoles')
const { ROW_DELETE } = require('../../Config')

VALIDATOR.extend('uniqueUsers', async({ value, args }) => {
    let field = args[0] || 'email'
    let condition = {
        where: {
            [field]: value,
            isDelete: ROW_DELETE.NOT_DELETE
        }
    }
    let result = await ModelUsers.findAll(condition)
    return !(result.length > 0)
})
VALIDATOR.extend('uniqueRole', async({ value, args }) => {
    let field = args[0] || 'name'
    let condition = {
        where: {
            [field]: value.trim(),
            isDelete: ROW_DELETE.NOT_DELETE
        }
    }
    let result = await ModelRoles.findAll(condition)
    return !(result.length > 0)
})
VALIDATOR.extend('mailExsist', async({ value, args }) => {
    let field = args[0] || 'email'
    let condition = {
        where: {
            [field]: value,
            isDelete: ROW_DELETE.NOT_DELETE
        }
    }
    let result = await ModelUsers.findAll(condition)
    return (result.length > 0)
})
VALIDATOR.extend('regUsers', async({value, args }) => {
    return (value.indexOf(',') > 0)
})
module.exports = {
    VALIDATOR: VALIDATOR,
    Validator: Validator
}