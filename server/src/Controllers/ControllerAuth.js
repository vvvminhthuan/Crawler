"use strict"

const {ModelUsers} = require('../Models')
const JWT = require('../Auth/JWT')
const BrcyptCode = require('../Auth/BrcyptCode')
const { setRes } = require('../Helpers/Response')
const { TOKEN_ACCESS, MODEL_DEV, OPTION_COKIE } = require('../Config')

module.exports = {
    /**
     * @swagger
     * /api/signin:
     *   post:
     *     summary: Người dùng đăng nhập vào hệ thống
     *     description: 
     *     tags: [ Auth ]
     *     parameters:
     *              - in: body
     *                name: email
     *                schema:
     *                  type: string
     *                  example: abc@gmail.com
     *                required: true
     *                description: email người dùng
     *              - in: body
     *                name: password
     *                schema:
     *                  type: string
     *                  example: admin123
     *                required: true
     *     responses:
     *       200:
     *         description: Đăng nhập thành công
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                  success:
     *                       type: boolean
     *                       description: Trạng thái đăng nhập
     *                       example: true
     *                  message:
     *                       type: string
     *                       description: Tin nhắn thông báo
     *                       example: Login complete!
     *                  results: 
     *                      type: object
     *                      properties:
     *                          accessToken: 
     *                              type: string
     *                              description: Server trả về một chuỗi token để client sử dụng
     *                              example: eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFkbWluIFRodWFuIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlSWQiOjEsImlhdCI6MTY1MDg2OTAxOSwiZXhwIjoxNjUwOTU1NDE5fQ.aNV3GG8_pSe9GE1bBrkiSct14ry8JWQv2R6nkZGGWFjIiWLcTlG50J-OeopuEx-L
     *       400:
     *          description: Đăng nhập thất bại password sai
     *       404: 
     *          description: Email không tồn tại trong hệ thống
     *                  
    */
    login: async (req, res) => {
        let userData = req.body 
        let condition = {
            where: {
                email: userData.email
            }
        }
        let userResult = await ModelUsers.findOne(condition)
        if (!userResult) {
            return setRes(res, 404, false, 'The email not exits!')
        }
        
        return BrcyptCode.compareCode(userData.password, userResult.password) 
        .then(value => {
            if (value) {
                let dataJwt = {
                    id: userResult.id,
                    name: userResult.firstName + ' ' + userResult.lastName,
                    email: userResult.email,
                    roleId: userResult.roleId
                }
                let accessToken = JWT.signCode(dataJwt)
                // let refreshToken = JWT.signCode(dataJwt, parseInt(EXPREFRESH))
                res.cookie( TOKEN_ACCESS, accessToken, OPTION_COKIE)
                // tam thoi chua can
                // res.cookie( TOKEN_REFRESH , refreshToken, { maxAge: 30*24*60*60, secure: !MODEL_DEV, httpOnly: true })
                setRes(res, 200, true, 'Login complete!', {
                    accessToken: accessToken, 
                    // refreshToken: refreshToken, //???
                    // success: true
                })
            }else{
                setRes(res, 400, false, 'The email or password not correct!')
            }
        })
        .catch(err => {
            setRes(res, 400, false, 'The authorizing not correct!')
        })
    },
    logout:(req, res)  => {
        try {
            if (JWT.verifyCode(req)) {
                res.cookie( TOKEN_ACCESS, '', { maxAge: 0, secure: !MODEL_DEV, httpOnly: true })
                setRes(res, 200, true, 'Logout complete!')
            }
        } catch (error) {
            setRes(res, 400, false, 'Logout fails!')
        }
    },
    // Tam Thoi khong su dung, token 1d thi bi mat hieu luc
    refreshToken:(req, res) => {
        try {
            let refreshToken = req.headers.authorization.replace('Bearer ', '')
            let refresh = null
            refresh = JWT.verifyCode(refreshToken)
            if (refresh) {
                let dataJwt = {
                    name: refresh.name,
                    email: refresh.email
                }
                let accessToken = JWT.signCode(dataJwt)
                setRes(res, 200, true, 'Logout complete!', {
                    accessToken: accessToken, 
                })
            }else{
                setRes(res, 200, false, 'Get refresh token fails.')
            }
        } catch (error) { 
            setRes(res, 400, false, 'Get refresh token fails.')
        }
    }
}