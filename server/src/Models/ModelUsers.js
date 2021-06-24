"use strict"

const ModelRoles = require('./ModelRoles')
const { sequelize, DataTypes, Op, Sequelize } = require('./ModelBase')

const ModelUsers = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
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
        defaultValue: 0,
        references: {
            model: ModelRoles,
            key: 'id'
        }
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
        allowNull: false,
        defaultValue: -1
    }
})

ModelUsers.belongsTo(ModelRoles, {
    foreignKey: 'roleId',
})

ModelUsers.findAllUsers = async (condition = {}) => {
    let include = {
        model: ModelRoles,
        attributes: ['id', "name", "role"],
        where: {
            roleChild: {
                [Op.ne]: sequelize.col('role')
            }
        }
    }
    return await ModelUsers.findAll({
        condition, 
        include
    })
}

module.exports = ModelUsers