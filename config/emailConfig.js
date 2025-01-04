const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
host: process.env.EMAIL, 
port: process.env.EMAIL_PORT || 587, 
  secure: false, 
    auth:{
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD,
    }
})

module.exports = transporter;