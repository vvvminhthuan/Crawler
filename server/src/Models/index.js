"use strict"
const {sequelize} = require('./ModelBase')
const ModelFiles = require('./ModelFiles')
const ModelGroups = require('./ModelGroups')
const ModelGroupUsers = require('./ModelGroupUsers')
const ModelMessages = require('./ModelMessages')
const ModelRoles = require('./ModelRoles')
const ModelUsers = require('./ModelUsers')

const Model = (() => {
    ModelUsers.belongsTo(ModelRoles, {foreignKey: 'roleId'})
    return {
        ModelFiles,
        ModelGroups,
        ModelGroupUsers,
        ModelMessages,
        ModelRoles,
        ModelUsers,
        transaction: sequelize.transaction()
    }
})()

module.exports = Model 