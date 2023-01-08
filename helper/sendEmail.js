require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (options)=>{

  
    const transport = await nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      const mailoption={
        from:options.from,
        to:options.to,
        subject:options.subject,
        text:options.text,
        html:options.html
      }
      console.log(mailoption)
       await transport.sendMail(mailoption ,(error, info) => {
        if (error) {
          console.log("error", error)
          console.log('Error occurred sendingg email');
          console.log(error.message);
        } else {
          console.log('Message sent successfully!');
          console.log(nodemailer.getTestMessageUrl(info));

        }
      })
}

module.exports=sendEmail