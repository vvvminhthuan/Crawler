"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')

const ModelRoles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    parentId: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleValidate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Now
    },
    updateAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Now
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = ModelRoles