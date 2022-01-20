const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'naganandams16@gmail.com',
      pass: '948030Vn@'
    }
  });

  module.exports = transporter;