"use strict"
const ModelFiles = require('../Models/ModelFiles')
const { setRes } = require('../Helpers/Response')

module.exports = {
    upLoad: (req, res) => {
        try {
            await uploadFile(req, res);
        
            if (req.file == undefined) {
              setRes(res, 400, false, 'Please upload a file!')
            }
        
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
            })
          } catch (err) {
            res.status(500).send({
              message: `Could not upload the file: ${req.file.originalname}. ${err}`,
            })
        }
    },
}