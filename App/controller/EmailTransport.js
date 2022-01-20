const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nagananjkjds16@gmail.com',
      pass: '11111111'
    }
  });

  module.exports = transporter;