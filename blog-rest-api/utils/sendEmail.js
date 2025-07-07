const nodemailer = require('nodemailer');
const {
  emailAccount,
  emailAppPassword,
  emailHost,
  emailPort
} = require('../config/keys');

const sendEmail = async ({ emailTo, subject, code, content }) => {
  try {
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailAccount, // generated ethereal user
        pass: emailAppPassword, // generated ethereal password
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      // from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`, // sender address
      to: emailTo, // list of receivers
      subject, // Subject line
      // text: content, // plain text body
      html: `
        <div>
          <h3>Use this below code to ${content}</h3>
          <p>${code}</p>
        </div>
      `, // html body
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = sendEmail;