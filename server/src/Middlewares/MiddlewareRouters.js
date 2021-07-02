"use strict"

const { setRes }= require('../Helpers/Response')

module.exports = {
    validateParams: function (req, res, next) {
        let id = req.params.id;
        let reg = new RegExp('^\\d+$');
        if (id !== undefined) {
            if (!reg.test(id)) {
                setRes(res, 404, false, 'Params query must is number')
            }
        }
        next();
    },
    detectParams: function (req, res, next) {
        let params = req.params
        let listParams = Object.keys(params)
        listParams.forEach(item => {
            if (!params[item]) {
                delete req.params[item]
            }
        })
        next()
    },
    validateParams: function (req, res, next) {
        if (Object.keys(req.params).length == 0) {
            setRes(res, 404, false, 'The params is required.')
        }
        next()
    }
}