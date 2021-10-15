"use strict"
const ModelGroups = require('./ModelGroups')
const ModelUsers = require('./ModelUsers')

const { sequelize, DataTypes, Model, Sequelize, Op } = require('./ModelBase')

const ModelGroupUsers = sequelize.define('groupUsers', {
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

ModelGroupUsers.belongsTo(ModelGroups, {
    foreignKey: 'groupId',
})

ModelGroupUsers.checkGroupExists = async (params) => {
    return await ModelGroupUsers.findAll({
        where: {
            userId: {
                [Op.in]: params 
            }
        },
        group:['groupId'],
        having: sequelize.where(sequelize.fn('COUNT', sequelize.col('groupId')), '>', 1),
        attributes: ['groupId', [sequelize.fn('count', sequelize.col('groupId')), 'counter']],
    })
}

module.exports = ModelGroupUsers