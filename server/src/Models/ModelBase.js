"use strict"

const { Sequelize, DataTypes, Model, Op, QueryTypes } = require('sequelize') 
const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT, PGCONNETNAME, MODEL_DEV } = require('../Config')
module.exports = {
    sequelize: new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        dialect: PGCONNETNAME,
        port: parseInt(PGPORT),
        logging: MODEL_DEV,
        logging: MODEL_DEV ? console.log : null, 
    }),
    DataTypes: DataTypes,
    Model: Model,
    Sequelize: Sequelize,
    Op: Op,
    QueryTypes: QueryTypes,
    testConnect: (sequelize) => {
        try {
            sequelize.authenticate()
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }
}