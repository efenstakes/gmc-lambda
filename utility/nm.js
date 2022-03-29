const nodemailer = require("nodemailer")



exports.subscribe = async function send_mail ({
  receiver, 
  subject, 
  message,
  // cv,
  cc_to,
  error_callback,
  success_callback,
}) {

  try {


    var transporter = nodemailer.createTransport({
        //   service: 'gmail',
        // host: 'smtp.gmail.com',
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        tls: {
          ciphers:'SSLv3'
        },
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'Greatmindsnrb@outlook.com', //  
            pass: 'Pn0727266811', // 
        }
    });
      
    var mailOptions = {
        from: 'Greatmindsnrb@outlook.com', // 
        to: receiver,
        cc: cc_to,
        subject: subject,
        html: message,
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('transporter.sendMail ', error);
          error_callback()
        } else {
          console.log('Email sent: ' + info.response);
          success_callback()
        }
    });

  } catch(e) {
    print('block error ', e)
    error_callback()
  }

} 

exports.send_mail = async function send_mail ({
        receiver, 
        subject, 
        message,
        photo,
        // cv,
        cc_to,
        error_callback,
        success_callback,
    }) {
    console.log('got photo ', photo)

    try {


        var transporter = nodemailer.createTransport({
            //   service: 'gmail',
            // host: 'smtp.gmail.com',
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            tls: {
               ciphers:'SSLv3'
            },
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'dev.tests@outlook.com', // 'hypemap.co@gmail.com',   
                pass: 'pwdForDevTests@101', // 'cerami11056'
            }
        });
          
        var mailOptions = {
            from: 'dev.tests@outlook.com', // 'hypemap.co@gmail.com',
            to: receiver,
            cc: cc_to,
            subject: subject,
            html: message,
            attachments: [
                { filename: photo.name, path: photo.path, },
                { filename: 'Application CSV', path: './application.csv', },
                // { filename: cv.name, path: cv.path, }
            ]
        };
      

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log('transporter.sendMail ', error);
              error_callback()
            } else {
              console.log('Email sent: ' + info.response);
              success_callback()
            }
        });

    } catch(e) {
        print('block error ', e)
        error_callback()
    }

} 

exports.create_msg = ({
        applicant_fullname,
        applicant_email,
        applicant_phone,
        applicant_title,
        expectations,
        company_name,
        company_email,
        company_phone,
        applicant_dob,
        application_type
    }) => {
    
    return `
        <p style="font-size: 12px;color:#292929">
          Hello I am ${applicant_fullname}. I am interested in your bootcamp. Please find my application details below. 
        </p>

        <h5 style="font-size: 13px;color:#292929"> Applicant Details </h5>
        <p style="font-size: 12px;color:#292929"> ${application_type} </p>
        <p style="font-size: 12px;color:#292929"> Name ${applicant_fullname} </p>
        <p style="font-size: 12px;color:#292929"> Email ${applicant_email} </p>
        <p style="font-size: 12px;color:#292929"> Phone ${applicant_phone} </p>
        <p style="font-size: 12px;color:#292929"> Date of Birth ${applicant_dob} </p>
        <p style="font-size: 12px;color:#292929"> Title ${applicant_title} </p>
        <p style="font-size: 12px;color:#292929"> Expectations: </p>
        <p style="font-size: 12px;color:#292929"> ${expectations} </p>
    
        <h5 style="font-size: 13px;color:#292929"> Company Details </h5>
        <p style="font-size: 12px;color:#292929"> Name ${company_name} </p>
        <p style="font-size: 12px;color:#292929"> Email ${company_email} </p>
        <p style="font-size: 12px;color:#292929"> Phone ${company_phone} </p> 
        
        <p style="font-size: 12px;color:#292929"> 
          I look forward to hearing from you. 
        </p>
        <p style="font-size: 12px;color:#292929"> 
          Regards. 
        </p>
    `;
}







// send_mail({
//     receiver: 'efenstakes101@gmail.com', 
//     subject: 'GMC', 
//     message: '<h>Hello Again</b>'
// })



// async function send() {
//     var transporter = nodemailer.createTransport({
//         //   service: 'gmail',
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure: false,
//         requireTLS: true,
//         auth: {
//             user: 'hypemap.co@gmail.com',   
//             pass: 'cerami11056',
//         }
//     });
    
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//         to: 'efenstakes101@gmail.com', // sender address
//         from: "hypemap.co@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         // text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>" // html body
//     });
    
//     console.log('info ', info)
    
// }

// try {
//     send()
// } catch (error) {
//     console.log('error ', error)
// }

