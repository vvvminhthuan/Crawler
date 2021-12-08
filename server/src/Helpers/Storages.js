const fs = require('fs')
const util = require('util')
const multer = require('multer')
const { STORAGE } = require('../Config')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let fileType = req.body.fileType ?? ''
        let pathFile = file.mimetype.indexOf('image') >= 0 ? STORAGE.PATH.IMAGE : STORAGE.PATH.DOC
        switch (fileType) {
            case STORAGE.TYPE.AVATAR:
                pathFile = pathFile + STORAGE.TYPE.AVATAR
                break
            case STORAGE.TYPE.CHAT:
                pathFile = pathFile + STORAGE.TYPE.CHAT
                break
            default:
                pathFile = pathFile + STORAGE.TYPE.ORTHER
                break
        }
        cb(null, __basedir + STORAGE.SUB_PATH_TMP + pathFile)

        setStorage(req, {filePath: pathFile})
    },
    filename: (req, file, cb) => {
        let name = Date.now() + Math.random()*10000
        cb(null, name)

        setStorage(req, {fileName: name})
    },
})

const uploadCompelete = () => {

}

const setStorage = (req, obj) => {
    if (req.storages) {
        let storage = Object.assign(req.storages, obj)
        req.storages = storage
    }else{
        req.storages = obj
    }
}

const storageFile = multer({
    storage: storage,
    limits: { fileSize: STORAGE.MAX_SIZE },
})

module.exports = {
    storage: fieldName => util.promisify(storageFile.single(fieldName)),
    storages: fieldNames => util.promisify(storageFile.array(fieldNames)),
}