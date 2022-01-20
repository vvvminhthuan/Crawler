const fs = require('fs')
const util = require('util')
const multer = require('multer')
const { STORAGE } = require('../../Config')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file)
        // let fileType = req.body.fileType ?? ''

        // let pathFile = file.mimetype.indexOf('image') >= 0 ? STORAGE.PATH.IMAGE : STORAGE.PATH.DOC
        // switch (fileType) {
        //     case STORAGE.TYPE.AVATAR:
        //         pathFile = pathFile + STORAGE.TYPE.AVATAR
        //         break
        //     case STORAGE.TYPE.CHAT:
        //         pathFile = pathFile + STORAGE.TYPE.CHAT
        //         break
        //     default:
        //         pathFile = pathFile + STORAGE.TYPE.ORTHER
        //         break
        // }
        cb(null, __basedir + STORAGE.SUB_PATH + STORAGE.PATH.IMAGE)
    },
    filename: (req, file, cb) => {
        let name = Date.now() + Math.random()*10000
        cb(null, name)
    },
})

const storageFile = multer({
    storage: storage,
    limits: { fileSize: STORAGE.MAX_SIZE },
})

module.exports = {
    STORAGE_FILE: storageFile
}