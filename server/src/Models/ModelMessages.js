"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')

const ModelMessages = sequelize.define('messages', {
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
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
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

module.exports = ModelMessages