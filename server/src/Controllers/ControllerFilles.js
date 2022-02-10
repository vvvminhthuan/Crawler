"use strict"
const {ModelFiles, sequelize} = require('../Models')
const { setRes } = require('../Helpers/Response')

module.exports = {
	test: async (req, res) => {
		const t = await sequelize.transaction()
		try {
			let rs = await ModelFiles.create({
				userId: 1, 
				name: 'HOANG MINH THUAN', 
				extension: 'jpeg', 
				type: 'AVATAR', 
				status: 1, 
				path: 'DUONG DAN NAY DEN TIM EM',
				createdBy: 1
			}, t)
			console.log(rs)
			throw new Error('Test transaction')
			t.commit()
		} catch (error) {
			console.log(error)
			t.rollback()
		}
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