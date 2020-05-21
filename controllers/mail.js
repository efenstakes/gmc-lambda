const messenger = require('./utility/nm')
var formidable = require('formidable')


exports.index = (req, res)=>{
    res.json({
        'app': 'GMC',
        'page': 'index',
        'message': 'working'
    })
}


exports.apply = (req, res)=> {
    let responze = { 'send': false }

    // var form = new formidable.IncomingForm()
    var form = formidable({ multiples: true })
    form.parse(req, function (err, fields, files) {
      
    // fields about applicant
    let {
        applicant_fullname, applicant_email, applicant_phone,
        applicant_title, applicant_dob, expectations,
        company_name, company_email, company_phone,
    } = fields
    // files --> cv and photo
    // var cv = files.applicant_cv
    var photo = files.applicant_photo

    // console.log('fields ', fields)
    console.log('files')
    // console.log(cv)
    // console.log('cv name ', cv.name,' path ', cv.path)
    console.log('photo name ', photo.name,' path ', photo.path)
    
    let mail_message = messenger.create_msg({
                        applicant_fullname,
                        applicant_email,
                        applicant_phone,
                        applicant_title,
                        expectations,
                        applicant_dob,
                        company_name,
                        company_email,
                        company_phone,
                    })
    // console.log('mail_message ', mail_message)
    messenger.send_mail({
            message: mail_message,
            receiver: 'agente.tikka@gmail.com',
            subject: 'GMC APPLICATION',
            // photo: photo.path,
            photo: photo,
            // cv: cv,
            cc_to: [ applicant_email ],
            error_callback: ()=> {
                return res.json(responze)
            },
            success_callback: ()=> {
                return res.json({ 'send': true })
            }
        })
     
    })

    // res.json({ 'page': 'mail', 'message': 'send mail' })
}