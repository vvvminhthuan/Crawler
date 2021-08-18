"use strict"

const nodemailer = require('nodemailer')
const {MAIL} = require('../../Config')

const mailConfig = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: MAIL.USER,
        pass: MAIL.PASSWORD
    }
}

const TRANSPORT = nodemailer.createTransport(mailConfig)

const sendMail = async (html, to, bcc='', subject='', from='Crawler <no-reply@crawler.com>') => {
    let inital = {
        from: from,
        to: to,
        bcc: bcc,
        subject: subject,
        html: html
    }
    try {
        let info = await TRANSPORT.sendMail(inital)
        if (info.messageId) {
            return true
        }
        return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const setTempHtml = (html, params) => {
    let listParms = Object.keys(params)
    listParms.forEach(element => {
        let reg = RegExp(`:${element}`, 'g')
        html = html.replace(reg, params[element])
    })
    let basicHtml = `
        <div style=" margin: auto;
        width: 80%;
        max-width: 750px;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 0 1px rgb(0 0 0 / 13%), 0 1px 3px rgb(0 0 0 / 20%);
        background-color: #fff;">
        <div class="heard" style="padding: 16px;
            background-color: #007bff;
            border-bottom: 1px solid #aaa;
            color: #fff;">
            <p style="color: #fff;">Welcome to Crawler system!</p>
        </div>
        :content
        <div class="footer" style="background-color: #c2c5d0;
            border-top: 1px solid #aaa;
            padding: 10px 15px;">
            <p>Email us: infor@gmail.com</p>
            <p>Phone: +0123456789</p>
            <p>Address: xda street, CPCC</p>
        </div>
    </div>`
    return basicHtml.replace(/(:content)/g, html)
}

module.exports = {
    sendMail: sendMail,
    setTempHtml: setTempHtml
}