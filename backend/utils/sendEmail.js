const nodemailer = require("nodemailer");

const sendEmailToMultipleRecipients = async (emails, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or smtp.yourprovider.com
    auth: {
      user: process.env.EMAIL_FROM,      // your Gmail or sender
      pass: process.env.EMAIL_PASS,      // app password or SMTP pass
    },
  });

  await transporter.sendMail({
    from: `"EcoTrack Admin" <${process.env.EMAIL_FROM}>`,
    to: emails.join(","),
    subject,
    html,
  });
};

module.exports = { sendEmailToMultipleRecipients };