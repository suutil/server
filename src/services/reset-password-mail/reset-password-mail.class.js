/* eslint-disable no-unused-vars */
class Service {
  constructor(options) {
    this.app = options.app;
    this.options = options || {};
  }

  _getUserService() {
    return this.options.app.service('users')
  }

  create(data, params) {
    return this._getUserService().find({
        query: {
          email: data.email.toLowerCase()
        }
      }).then(result => {
        console.log('hééé',result)
        if (result.length === 1) {
          let user = result[0]
          let url = this.app.service('set-password').getUrlSetPassword(user._id)

          /*  return this.app.service('mail-template').update('resetPassword', {
            name: user.name,
            resetPasswordUrl: url
          })
        }
      }).then(mailContent => {
        if (!mailContent) {
          return
        }*/
          return this.app.service('send-mail').create({
            to: data.email, //TODO
            subject: 'Restablecer contraseña',
            content: 'Pincha el siguiente link para resetear tu contraseña. Ojo! este link caduca.<br><br><a href="http://www.suutil.com/reset-password'
            + url +
            '"> Restablecer contraseña </a>'
          })
        }
      })
      .then(_ => {
        return {
          status: 'ok'
        }
      })

  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
