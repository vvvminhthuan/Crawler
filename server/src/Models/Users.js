"use strict"

const { types } = require('pg')
const { sequelize, DataTypes, Model } = require('./ModelBase')

const Users = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    numberId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

module.exports = {
    createUser: (params) => {
        
    },
}