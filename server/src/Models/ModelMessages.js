"use strict"

const { sequelize, DataTypes, Model, Sequelize, Op } = require('./ModelBase')
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
    return ModelMessages.findAll({
        where: {
            groupId: params.groupId,
            content: {
                [Op.like]: `%${params.search}%`
            },
            isDelete: ROW_DELETE.NOT_DELETE
        },
        attributes: ["id", "userId", "content", "type", "createdAt", "groupId"],
        order:["createdAt"]
    })
    .then((result) => {
        return result
    }).catch((err) => {
        console.log('Errors: ' + err)
    })
}

ModelMessages.countUnreadMessages = (params) => {
    return ModelMessages.findAll({
        where: {
            groupId: params.groupId,
            type: params.type,
            userId: {
                [Op.ne]: params.userId
            }
        },
        attributes: [[sequelize.fn('count', sequelize.col('groupId')), 'numMessage']]
    })
    .then((result) => {
        return result
    }).catch((err) => {
        console.log('Errors: ' + err)  
    })
}

ModelMessages.updateReaded = (params, conditions) => {
    return ModelMessages.update(params, {
        where: {
            groupId: conditions.groupId,
            userId: conditions.userId,
            createdAt: {
                [Op.lte]: conditions.createdAt
            }
        }
    })
    .then((result) => {
        return result
    }).catch((err) => {
        console.log('update' + err)  
    })
}

module.exports = ModelMessages