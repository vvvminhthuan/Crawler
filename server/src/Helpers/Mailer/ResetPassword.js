"use strict"

const { sendMail, setTempHtml } = require('./MailerBasic')
const resetPasswordTmp = require('./tmp/resetPasswordTmp')

const ResetPassword = (params, to) => {
    let html = setTempHtml(resetPasswordTmp(), params)
    sendMail(html, to, '', '[Reset Password - Crawler System]')
}

module.exports = ResetPassword