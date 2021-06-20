"use strict"

const { sequelize, DataTypes, Op, Sequelize } = require('./ModelBase')
const {ROW_DELETE} = require('../Config')
const ModelRoles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    parentId: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    roleChild: {
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

ModelRoles.createRoles = async (newRole, newAdmin, oldAdmin) => {
    const transaction = await sequelize.transaction()
    try {
        await ModelRoles.create(newRole, {transaction})
        await ModelRoles.update(newAdmin,{
            where: oldAdmin
        }, {transaction})
        await transaction.commit()
        return true
    } catch (error) {
        await transaction.rollback()
        return false
    }
}

ModelRoles.findAllRoles = async (condition = {}) => {
    let unShowAdmin = {
        roleChild: {
            [Op.ne]: sequelize.col('role')
        }
    }
    condition.order = [
        ['role', 'DESC']
    ]
    if (condition.where) {
        Object.assign(condition.where, unShowAdmin)
    }
    return await ModelRoles.findAll(condition)
}

ModelRoles.findOneRoles = async (condition = {}) => {
    let unShowAdmin = {
        roleChild: {
            [Op.ne]: sequelize.col('role')
        }
    }
    if (condition.where) {
        Object.assign(condition.where, unShowAdmin)
    }
    return await ModelRoles.findOne(condition)
}

ModelRoles.updateRoles = async (condition, newRole, roleChange = 0) => {    
    try {
        await sequelize.transaction( async t =>{
            const roleAdmin = await ModelRoles.findOne({
                where:{
                    roleChild: {
                        [Op.eq]: sequelize.col('role')
                    }
                }
            },t)
            let newRoleAdmin = {
                role: roleAdmin.role + roleChange,
                roleChild: roleAdmin.roleChild + roleChange,
            }
            let role = await ModelRoles.update(newRole, condition, t)
            if (roleChange != 0 && role) {
                await roleAdmin.update(newRoleAdmin, t)
            }
        })  
        return true
    } catch (error) {
        console.log(error)
        return false
    }
        
}

module.exports = ModelRoles