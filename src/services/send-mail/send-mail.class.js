/* eslint-disable no-unused-vars */

const nodemailer = require('nodemailer');

var mandrillTransport = require('nodemailer-mandrill-transport');

class Service {
  constructor(options) {
    this.options = options || {};
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: options.mailConfig.user,
        pass: options.mailConfig.password
      }
    })

    /*  this.transporter = nodemailer.createTransport(mandrillTransport({
        auth: {
          apiKey: options.mailConfig.mandrillKey
        }
      }));*/
  }


  create(data, params) {
    console.log('options :', this.options)
    let res, rej
    let promise = new Promise((_res, _rej) => {
        res = _res
        rej = _rej
      })
      // setup email data with unicode symbols
    let mailOptions = {
      from: this.options.mailConfig.from,
      to: data.to,
      subject: data.subject,
      html: data.content
    };

console.log(mailOptions)
    // send mail with defined transport object
    this.transporter.sendMail(mailOptions, (error, info) => {

      if (error) {
        console.log(error)
        rej(error)
      } else {
        console.log('Message %s sent: %s', info.messageId, info.response)
        res('Message %s sent: %s', info.messageId, info.response)
      }
    });

    return promise
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
