"use strict"

const { sequelize, DataTypes, Model, Sequelize } = require('./ModelBase')

const ModelRoles = sequelize.define('roles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    parentId: {
        type: DataTypes.INTEGER,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleValidate: {
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
        const role = await ModelRoles.findOne({
            where: oldAdmin
        }, {transaction})
        console.log(role)
        // await ModelRoles.create(newRole, {transaction})
        // await ModelRoles.update(newAdmin,{
        //     where: oldAdmin
        // }, {transaction})
        // await transaction.commit()
        return true
    } catch (error) {
        await transaction.rollback()
        return false
    }
}

module.exports = ModelRoles