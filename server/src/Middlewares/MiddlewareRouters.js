"use strict"

module.exports = {
    validateParams: function (req, res, next) {
        let id = req.params.id;
        let reg = new RegExp('^\\d+$');
        if (id !== undefined) {
            if (!reg.test(id)) {
                return res.json({
                    error: "Params query must is number"
                });
            }
        }
        next();
    },
    detectParams: function (req, res, next) {
        let listParams = Object.keys(req.params)
        let params = req.params
        listParams.forEach(item => {
            if (!params[item]) {
                delete req.params[item]
            }
        })
        next();
    }
}