"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')
const {ROW_DELETE} = require('../Config')

const ModelMessages = sequelize.define('messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
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

ModelMessages.findAllMessages = (params = {}) => {
    let condition = {
        where: {
            groupId: params.groupId,
            content: {
                [Op.like]: `%${params}%`
            },
            isDelete: ROW_DELETE.NOT_DELETE
        },
        order: [
            ['createdAt', 'ASC']
        ]
    }
    return ModelMessages.findAll(condition)
    .then((result) => {
        return result
    }).catch((err) => {
        
    })
}

module.exports = ModelMessages