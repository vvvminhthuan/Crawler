"use strict"

const { Sequelize, DataTypes, Model } = require('sequelize') 
const { PGUSER, PGHOST, PGPASSWORD, PGDATABASE, PGPORT, PGCONNETNAME } = require('../Config')

module.exports = {
    Sequelize: new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
        host: PGHOST,
        dialect: PGCONNETNAME,
        port: parseInt(PGPORT)
    }),
    DataTypes: DataTypes,
    Model: Model
}