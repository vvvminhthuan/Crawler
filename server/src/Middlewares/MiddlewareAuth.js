"use strict"

module.exports = {
    Auth: function (req, res, next) {
        console.log('Thuận tao thì sống, chống tao thì chết')
        next();
    }
}