"use strict"

const { Sequelize, DataTypes, Model, Op } = require('sequelize') 
const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT, PGCONNETNAME } = require('../Config')

module.exports = {
    sequelize: new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        dialect: PGCONNETNAME,
        port: parseInt(PGPORT)
    }),
    DataTypes: DataTypes,
    Model: Model,
    Sequelize: Sequelize,
    testConnect: (sequelize) => {
        try {
            sequelize.authenticate()
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }
}