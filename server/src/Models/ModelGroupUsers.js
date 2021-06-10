"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')

const ModelGroupUsers = sequelize.define('groupUsers', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
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

module.exports = ModelGroupUsers