const jwtLib = require('jsonwebtoken');

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
    let config = this.options.app.get('auth')
    let password = data.password
    let token = params.headers['authorization']
    let userId = jwtLib.verify(token, config.secret, config.jwt.algorithm, (err,decoded)=>{
      return decoded.userId
    })


    return this._getUserService().get(userId)
      .then(user => {
        let userPasswordUpdate = Object.assign({}, user)
        userPasswordUpdate.password = password
        return this._getUserService().update(userId, userPasswordUpdate)
      })
      .then(_ => {
        return {
          status: 'ok'
        }
      })

  }

  getUrlSetPassword(userId) {
    let config = this.options.app.get('auth')
    var accessToken = jwtLib.sign({
      userId: userId
    }, config.secret, {
      expiresIn: config.jwt.resetPasswordExpiresIn,
    /*  issuer: config.jwt.issuer,
      audience: config.jwt.audience,
      subject: config.jwt.subject,*/
    })
    console.log('accessToken:', accessToken)
    return this.app.get('webEndpoints').setPassword + '?token=' + accessToken
  }



}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
