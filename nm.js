const nodemailer = require("nodemailer")


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


async function send_mail ({receiver, subject, message}) {

    var transporter = nodemailer.createTransport({
        //   service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'hypemap.co@gmail.com',   
            pass: 'cerami11056'
        }
    });
      
      var mailOptions = {
        from: 'hypemap.co@gmail.com',
        to: receiver,
        subject: subject,
        html: message,
        attachments: [
            {   // file on disk as an attachment
                filename: 'klm-fonts.txt',
                path: 'E:/apps/fonts.txt' // stream this file
            }
        ]
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

} 

send_mail({
    receiver: 'efenstakes101@gmail.com', 
    subject: 'GMC', 
    message: '<h>Hello Again</b>'
})