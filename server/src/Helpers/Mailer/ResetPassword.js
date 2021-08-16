"use strict"

const { sendMail, setTempHtml } = require('./MailerBasic')
const resetPasswordTmp = require('./tmp/resetPasswordTmp')

const resetPassword = async (params, to) => {
    let html = setTempHtml(resetPasswordTmp(), params)
    return await sendMail(html, to, '', '[Reset Password - Crawler System]')
}

module.exports = resetPassword