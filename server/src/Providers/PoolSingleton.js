"use strict"
const { PGIDLETIMEOUT, PGMAX, } = require('../Config')
const { Pool } = require('pg')
//scope closure
const configPool = {
    idleTimeoutMillis: PGIDLETIMEOUT,
    max: PGMAX
}

const poolSingleton = ( configP => {
    var instance
    function createInstance(configP) {
        let obj = new Pool(configP)
        return obj
    }
    return {
        getInstance: () => {
            if (!instance) {
                instance = createInstance(configP)
            }
            return instance
        }
    }
})(configPool)

module.exports = poolSingleton