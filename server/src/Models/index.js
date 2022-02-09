"use strict"
const {sequelize} = require('./ModelBase')
const ModelFiles = require('./ModelFiles')
const ModelGroups = require('./ModelGroups')
const ModelGroupUsers = require('./ModelGroupUsers')
const ModelMessages = require('./ModelMessages')
const ModelRoles = require('./ModelRoles')
const ModelUsers = require('./ModelUsers')
const Model = {}

Model.sequelize = sequelize

Model.ModelFiles = ModelFiles,
Model.ModelGroups = ModelGroups,
Model.ModelGroupUsers = ModelGroupUsers,
Model.ModelMessages = ModelMessages,
Model.ModelRoles = ModelRoles,
Model.ModelUsers = ModelUsers,
// Association
Model.ModelUsers.belongsTo(ModelRoles, {foreignKey: 'roleId'})
Model.ModelUsers.hasMany(ModelFiles, {foreignKey: 'userId'})
Model.ModelUsers.hasMany(ModelGroupUsers, {foreignKey: 'userId'}) 

module.exports = {...Model} 