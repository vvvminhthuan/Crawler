const config = require('./src/Config')

const express =  require('express')
const app =  express()
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer()

const socket = require('socket.io')
const SocketEvent = require('./src/SocketEvent')
var server = null

if (config.MODEL_DEV) {
    server = require('http').Server(app)  
} else {
    const options = {
        key: fs.readFileSync('./ssl/key.pem', 'utf8'),
        cert: fs.readFileSync('./ssl/cert.pem', 'utf8'),
    }
    server = require('https').Server(options, app)
}
const allowedOrigins = config.ALLOWED_ORIGINS
const _io = socket(server, {
    cors: {
        origin: allowedOrigins,
        methods: ["GET", "POST"],
        credentials: true,
    }
})

app.use((req, res, next)=>{
    // Website you wish to allow to connect
    const origin = req.headers.origin
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
    } 
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8088') 
    // res.setHeader('Access-Control-Allow-Origin', "http://localhost:8087") 
    
    res.setHeader('Content-Type', 'application/json')
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    // when client user method OPTIONS
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    // Pass to next layer of middleware
    return next()
})

// disable nguon cung cap api
app.disable('x-powered-by') 

app.use(express.static('stores'))
app.use(bodyParser.json({limit: '1mb'}))
app.use(bodyParser.urlencoded({ extended: false }))// for parsing application/x-www-form-urlencoded
app.use(upload.array()) // for parsing multipart/form-data
app.use('/api', require('./src/Routers'))
app.use(function (req, res, next) {
    res.io = _io
})

server.listen(config.PORT, function () {
    console.log(`System run on port: ${config.PORT}`)
    SocketEvent(_io)
})