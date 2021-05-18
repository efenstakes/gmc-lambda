const messenger = require('../utility/nm')
var formidable = require('formidable')
const create_csv_writer = require('csv-writer').createObjectCsvWriter;


exports.index = (req, res)=>{
    const csv_writer = create_csv_writer({
        path: './application.csv',
        header: [
            {id: 'question', title: 'Question'},
            {id: 'answer', title: 'Answer'}
        ]
    });
     
    const records = [
        {question: 'Applicant Name',  answer: 'Jamie French'},
        {question: 'Applicant Dob', answer: '01/12/1990'}
    ];
     
    csv_writer.writeRecords(records)       // returns a promise
        .then(() => {
            console.log('...Done');
        });

    res.json({
        'app': 'GMC',
        'page': 'index',
        'message': 'working'
    })
}


exports.subscribe = (req, res)=>{
    let responze = { send: false }
    
    const { name, email, company_or_individual } = req.data

    const mail_message = `  
        <p>
            Hello I am ${name}. I would like to subscribe to Great Minds Kenya Newletters. 
        </p>
        <h3> Applicant Details <h3>
        <p> ${name} </p>
        <p> Name ${email} </p>

        <h2> Company or Individual <h2>
        <p> ${company_or_individual} </p>
        <p> 
            I look forward to hearing from you. 
        </p>
        <p> 
            Regards. 
        </p>
        `;
    messenger.subscribe({
        message: mail_message,
        receiver: 'agente.tikka@gmail.com',
        subject: 'News Letter Subscription',
        cc_to: [ applicant_email ],
        error_callback: ()=> {
            return res.json(responze)
        },
        success_callback: ()=> {
            return res.json({ send: true })
        }
    })
}


exports.apply = async (req, res)=> {
    let responze = { send: false }

    // var form = new formidable.IncomingForm()
    var form = formidable({ multiples: true })
    form.parse(req, async function (err, fields, files) {
      
    // fields about applicant
    let {
        applicant_fullname, applicant_email, applicant_phone,
        applicant_title, applicant_dob, expectations,
        company_name, company_email, company_phone,
        application_type
    } = fields
    // files --> cv and photo
    // var cv = files.applicant_cv
    var photo = files.applicant_photo

    // console.log('fields ', fields)
    console.log('files')
    // console.log(cv)
    // console.log('cv name ', cv.name,' path ', cv.path)
    console.log('photo name ', photo.name,' path ', photo.path)
    
    // create csv file of the data
    const csv_writer = create_csv_writer({
        path: './application.csv',
        header: [
            {id: 'question', title: 'Question'},
            {id: 'answer', title: 'Answer'}
        ]
    });
     
    const records = [
        {question: 'Application Type',  answer: application_type},
        {question: 'Applicant Name',  answer: applicant_fullname},
        {question: 'Applicant Email', answer: applicant_email},
        {question: 'Applicant Phone', answer: applicant_phone},
        {question: 'Applicant Dob', answer: applicant_dob},
        {question: 'Applicant Title', answer: applicant_title},
        {question: 'Applicant Expectations', answer: expectations},
        {question: 'Company Name', answer: company_name},
        {question: 'Company Email', answer: company_email},
        {question: 'Company Phone', answer: company_phone},
    ];
    // create the file with above data
    await csv_writer.writeRecords(records)
        

    // create email message
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
                        application_type,
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