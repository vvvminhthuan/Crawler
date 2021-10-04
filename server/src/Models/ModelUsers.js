"use strict"

const ModelRoles = require('./ModelRoles')
const ModelGroupUsers = require('./ModelGroupUsers')
const { sequelize, DataTypes, Op, Sequelize } = require('./ModelBase')
const attributes = [
        'id', 
        "firstName", 
        "lastName", 
        "nickName", 
        "email", 
        "phoneNumber", 
        "numberId", 
        "address", 
        "roleId", 
        "online", 
        "createdAt", 
        "firstName", 
        "firstName", 
        "firstName", 
        "firstName"
    ]
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
    birthDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: DataTypes.INTEGER,
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
    online: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
        allowNull: false,
        defaultValue: -1
    }
})

ModelUsers.belongsTo(ModelRoles, {
    foreignKey: 'roleId',
})

// ModelGroupUsers.hasMany(ModelUsers, {
//     foreignKey: 'userId',
// }) 

ModelUsers.findAllUsers = async (condition = {}, isIncludeAdmin = false) => {
    let include = {
        model: ModelRoles,
        attributes: ['id', "name", "role"],
        required: false
    }
    if (!isIncludeAdmin) {
        include.where = {
            roleChild: {
                [Op.ne]: sequelize.col('role')
            }
        }
    }
    return await ModelUsers.findAll({
        where: condition.where, 
        include,
        attributes
    })
}

// ModelUsers.getAllGroups = async () => {
//     let sql = `SELECT "users"."id", "users"."firstName", "users"."lastName", "users"."nickName", "users"."email", "users"."phoneNumber", "users"."numberId", "users"."address", 
//     "users"."roleId", "users"."online", "groupUsers"."groupId"
//     FROM "users" AS "users" 
//     LEFT OUTER JOIN "groupUsers" AS "groupUsers" ON "users"."id" = "groupUsers"."userId" 
//     WHERE "users"."isDelete" = 0`
//     return await sequelize.query(sql)
// }

ModelUsers.getAllGroups = async (conditions) => {
    let include = {
        model: ModelGroupUsers,
        attributes: ['id', "userId", "groupId"],
        required: false
    }
    return await ModelUsers.findAll({ 
        include,
        attributes,
        conditions
    })
}

module.exports = ModelUsers