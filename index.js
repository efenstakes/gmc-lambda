// include external libraries
const Express = require('express')
const BodyParser = require('body-parser')
const DotEnv = require('dotenv')
const Cors = require('cors')
const Morgan = require('morgan')
var formidable = require('formidable')
var fs = require('fs')


// include internal libraries
const messager = require('./messanger')



// get environment vars from .env
DotEnv.config()
const PORT = process.env.PORT || 3000



// initialize express apllication instance
const app = Express()

// log request info
app.use(Morgan('dev'))


// setup server to allow cor's
app.use(Cors())

// setup body parser to help acess json and urlencoded data from
// client applications
app.use(BodyParser.json())
app.use(BodyParser.urlencoded({ extended: false }))


/** 
* hook up routes with the app instance
*/


app.get('/', (req, res)=>{
	res.json({
		'page': 'index',
		'message': 'working'
	})
})

// send email
app.post('/mail', (req, res)=> {
	let responze = { 'send': false }

	// var form = new formidable.IncomingForm()
	var form = formidable({ multiples: true })

	form.parse(req, function (err, fields, files) {
      
        // fields about applicant
		let {
			applicant_fullname,
			applicant_email,
			applicant_phone,
			applicant_title,
			expectations,
			applicant_dob,
			company_name,
			company_email,
			company_phone,
		} = fields
        // files --> cv and photo
        var cv = files.applicant_cv
        var photo = files.applicant_photo


		console.log('fields ', fields)
        console.log('files')
        console.log(cv)

        console.log('cv name ', cv.name,' path ', cv.path)
        console.log('photo name ', photo.name,' path ', photo.path)

      
	  //   fs.readFile(cv.path, 'Base64', function(err, contents) { 'utf8'

		  	// if(err) return res.json(responze)
		  	// console.log('contents')
		   //  console.log(contents)
	      
		    // var mail = messager.make_mail(
		    //                { name: fields.username, email: fields.email },
		    //                null,
		    //                cv,
		    //                contents,
		    //                photo ? photo : null
		    //            )
		    // console.log('send mail')

			// mail.then((result) => {
			//     console.log(result)
			//   })
			//   .catch((err) => {
			//     console.log(err) //.message)
			//   })
	  //   })

     
    })

	res.json({ 'page': 'mail', 'message': 'send mail' })
})



// start application
app.listen(PORT, '0.0.0.0', () => {
    console.log(`server started at port ${PORT}`)
})