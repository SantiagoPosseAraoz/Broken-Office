const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_GMAIL,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

transporter.verify(() => {
  console.log("ready to send emails");
});

module.exports = transporter;
