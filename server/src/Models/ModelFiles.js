"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')

const ModelFiles = sequelize.define('groups', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    extension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
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

module.exports = ModelFiles