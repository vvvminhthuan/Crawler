"use strict"
const config = require('../Config')
const bcrypt = require('bcrypt')

module.exports = {
    hashCode: async (value) => {
        let saltRound = parseInt(config.SALT)
        let salt = await bcrypt.genSalt(saltRound)
        .then(salt =>{
            return salt
        })
        .catch(err => {
            console.log(err + '')
        });
        return await bcrypt.hash(value, salt)
        .then(hash =>{
            return hash
        })
        .catch(err => {
            console.log(err + '')
        });
    },
    compareCode: (value, hash) => { 
        return bcrypt.compare(value, hash)
        .then(result => {
            return result
        }) 
        .catch(err => {
            console.log(err + '')
        });
    }
}