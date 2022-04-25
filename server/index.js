const config = require('./src/Config')

const express =  require('express')
const app =  express()
const bodyParser = require('body-parser')

const socket = require('socket.io')
const SocketEvent = require('./src/SocketEvent')
var server = null

const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

// Docs inital with swagger
const swaggerDosOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Api V1',
            version: '1.0.0',
        },
    },
    apis: [ "../src/Routers/*.js", "./src/Routers/Client/*.js", "./src/Controllers/*.js", "./src/Models/*.js" ] // files containing annotations as above
};

const swaggerDocs = swaggerJsdoc(swaggerDosOptions)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

process.env.TZ = 'Asia/Tokyo'

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
    // res.setHeader('Content-Type', 'text/html; charset=utf-8')
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

app.use(function (req, res, next) {
    res.io = _io
    next()
})
app.use('/api', require('./src/Routers'))

server.listen(config.PORT, function () {
    console.log(`System run on port: ${config.PORT}`)
    SocketEvent(_io)
})