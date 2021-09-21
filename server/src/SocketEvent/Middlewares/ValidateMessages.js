"use strict"
const { Validator } = require('../../Middlewares/Validates/ValidateBasic')

module.exports = {
    CREATE_UPDATE_MESSAGE: function (body) {
        let validate = new Validator(body, {
            groupId: 'required',
            userId: 'required',
            content: 'required|sometimes'
        })
        return validate.check()
        .then(matched =>{
            return matched // false neu valid sai
        })
        .catch(err => {
            console.log('Validate message erros ' + err + '')
            return false
        })
    }
}