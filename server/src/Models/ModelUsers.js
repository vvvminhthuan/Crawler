"use strict"

const ModelRoles = require('./ModelRoles')
const ModelGroupUsers = require('./ModelGroupUsers')
const { sequelize, DataTypes, Op, Sequelize, QueryTypes } = require('./ModelBase')
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

ModelUsers.getAllGroups = async (conditions) => {
    let sql = `SELECT u.id, u."firstName", u."lastName", u."nickName", u.email, u."phoneNumber", u."numberId",u."roleId", u.online, gu."groupId" AS "groupId", m."numMessage"
        FROM users AS u
        LEFT JOIN (select gu1."groupId", gu1."userId" 
        from "groupUsers" AS gu1 
        JOIN (select "groupId", "userId" from "groupUsers" where "userId" = ${conditions.userId}) AS gu2 on gu1."groupId" = gu2."groupId" 
        where gu1."userId" != ${conditions.userId}) AS gu ON u.id = gu."userId"
        LEFT JOIN (SELECT count(mm.id) AS "numMessage", mm."groupId" FROM messages as mm WHERE mm.type = ${conditions.type} AND mm."userId" <> ${conditions.userId} GROUP BY mm."groupId") AS m ON m."groupId" = gu."groupId"
        WHERE u."isDelete" = ${conditions.isDelete} AND u."id" <> ${conditions.userId}
        ORDER BY u.id`
    return await sequelize.query(sql, {type: QueryTypes.query})
}

// ModelUsers.getAllGroups = async (conditions) => {
//     let where = {
//         where: {
//             // [Op.and]: [
//             //     { '$groupUsers.userId$': conditions.userId }
//             // ],
//             userIsDelete: conditions.isDelete
//         }
//     }
//     let include = {
//         model: ModelGroupUsers,
//         attributes: [['groupId', 'UgroupId'], ['userId', 'UuserId']],
//         required: false,
//     }
//     return await ModelUsers.findAll({ 
//         include,
//         // where,
//         attributes: ['id', 'firstName', 'lastName', 'nickName', 'email', 'online']
//     })
// }

module.exports = ModelUsers