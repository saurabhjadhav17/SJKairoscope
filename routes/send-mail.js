const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
   // true for 465, false for other ports
    auth: {
      user: 'kairoscopephotgraphy@gmail.com', // generated ethereal user
      pass: 'kairoscope123' // generated ethereal password
    }
    /*tls:{
      rejectUnauthorized: false
    }
    */
  });

module.exports = transporter;
