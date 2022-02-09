"use strict"
const {ModelUsers} = require('../Models')
const { setRes } = require('../Helpers/Response')

module.exports = {
	test: (req, res) => {
		ModelUsers.findAll()
		.then((result) => {
			console.log(result)
			setRes(res, 200, true, 'get all', result)
		}).catch((err) => {
			console.log(err)
		})
	},
    upLoad: (req, res) => {
        try {
        	// uploadFile(req, res);
        
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