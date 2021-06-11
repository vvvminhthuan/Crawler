"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')

const ModelGroupUsers = sequelize.define('groupUsers', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDelete: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Now
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.Now
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = ModelGroupUsers