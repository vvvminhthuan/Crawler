const fs = require('fs')
const util = require('util')
const multer = require('multer')
const { STORAGE } = require('../../Config')

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Storage') 
    }, 
    filename: (req, file, cb) => {
        let name = Date.now() + parseInt(Math.random()*10000)
        let pathFile = file.mimetype.indexOf('image') >= 0 ? STORAGE.PATH.IMAGE : STORAGE.PATH.DOC
        let arrType = file.originalname.split('.')
        let extents = arrType[arrType.length - 1]

        cb(null, `${pathFile}/${name}.${extents}`)
    },
})
const storageMulter = multer({
    storage: storage,
    limits: { fileSize: STORAGE.MAX_SIZE },
})
module.exports = {
    STORAGE_FILE: fileName => storageMulter.single(fileName),
    STORAGE_FILES: fileNames => storageMulter.array(fileNames)
}