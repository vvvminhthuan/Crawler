"use strict"
const ModelRoles = require('../Models/ModelRoles')

module.exports = {
    getItems: (req, res) => {
        let params = req.params
        let condition = {}
        if (params) {
            condition = {
                where: params
            }
        }
        return ModelRoles.findAll(condition)
            .then(result => {
                res.status(200)
                res.json({
                    "status": true,
                    result: result
                })
            })
            .catch (err => {
                res.status(500)
                res.json({
                    "status": false,
                    'message': `Can't query`,
                    "error": err + ''
                })
            })
    },
    update: async (req, res) => {
        
    },
    create: (req, res) => {
        
    }
}