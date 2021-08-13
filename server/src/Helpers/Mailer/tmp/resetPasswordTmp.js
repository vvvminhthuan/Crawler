"use strict"

const resetPassword = () => {
    return `<div style="padding: 20px;">
    <p>Dear member</p>
    <p>System send for you link reset password, click <a href=":url">url</a> to reset password</p>
    <p>this link will expire in 24 hour</p>
    <p>This is auto email, please not reply this email.</p>
</div>`
}

module.exports = resetPassword