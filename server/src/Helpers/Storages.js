const util = require('util')
const multer = require('multer')
const {STORAGE} = require('../Config');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __basedir + STORAGE.SUB_PATH)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

let storageFile = multer({
    storage: storage,
    limits: { fileSize: STORAGE.MAX_SIZE },
})

module.exports = {
    storage: fieldName => util.promisify(storageFile.single(fieldName)),
    storages: fieldNames => util.promisify(storageFile.array(fieldNames)),
}