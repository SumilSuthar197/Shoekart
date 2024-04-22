const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `Shoekart <${process.env.SMTP_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log("Email not sent: " + error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
