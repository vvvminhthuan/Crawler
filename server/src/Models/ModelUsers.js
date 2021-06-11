"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')

const Users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nickName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
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
        allowNull: false,
        defaultValue: 0
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

Users.test = () => {
    console.log('test')
}

module.exports = Users