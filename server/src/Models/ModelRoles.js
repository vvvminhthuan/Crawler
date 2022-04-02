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
/**
 * Tra ve danh role sap sep theo dang tree, loc theo role
 * Hien thi nhung role theo role cua dang nhap, va nhung cap con cua role
 * @param {string} role role value cua nguoi dung dang nhap
 */
ModelRoles.getRolesByTree = async (role = 0) => {
    let condition = {
        where: {
            isDelete: ROW_DELETE.NOT_DELETE,
            roleChild: {
                [Op.ne]: sequelize.col('role')
            }
        },
        raw: true
    }
    condition.order = [
        ['role', 'DESC']
    ]
    
    let data = await ModelRoles.findAll(condition)
    let roleDefault = data.filter(item => item.parentId == -1)
    let maxRole = data.filter(i=>i.role == role && i.role !== i.roleChild)
    let maxId = maxRole[0] ? maxRole[0].id : 0
    let roles = roleTreeReCursion(data.filter(item => item.parentId !== -1), maxId)
    return {
        roles,
        roleDefault
    }
}
/**
 * Tra ve mang object, trong do object con long vao object cha
 * @param {object[]} data 
 * @param {string} parentId
 */
const roleTreeReCursion = (data, parentId = 0) => {
    let result = []
    if (data.length > 0) {
        let list = data.filter(i => i.parentId == parentId)
        list.forEach(e => {
            let child =     
            result.push({...e, child})
        })
    }
    return result
}

module.exports = ModelRoles