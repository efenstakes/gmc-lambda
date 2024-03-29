// include external libraries
const Express = require('express')
const BodyParser = require('body-parser')
const DotEnv = require('dotenv')
const Cors = require('cors')
const Morgan = require('morgan')
var fs = require('fs')


// include internal libraries
const mail_controller = require('./controllers/controller')


// get environment vars from .env
DotEnv.config()



// initialize express apllication instance
const app = Express()

// log request info
app.use(Morgan('dev'))

// setup server to allow cor's
app.use(Cors())

// setup body parser to help acess json and urlencoded data from
// client applications
app.use(Express.json())
app.use(Express.urlencoded({ extended: false }))


/** 
* hook up routes with the app instance
*/



app.get('/', mail_controller.index)


// inquire
app.post('/inquire', mail_controller.inquire)


// subscribe
app.post('/subscribe', mail_controller.subscribe)


// send email
app.post('/mail', mail_controller.apply)


const PORT = process.env.PORT || 3000
// const PORT = process.env.PORT || 3333

// start application
app.listen(PORT, '0.0.0.0', () => {
    console.log(`server started at port ${PORT}`)
})



// https://dashboard.heroku.com/apps/enigmatic-coast-88833  
//   fs.readFile(cv.path, 'Base64', function(err, contents) { 'utf8'
