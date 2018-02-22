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
    let confirmation = data.activated
    console.log(params.headers)
    let token = params.headers['authorization']
    console.log('token',token)
    console.log('secret', config.secret)
    console.log('algo', config.jwt.algorithm)
    let userId = jwtLib.verify(token, config.secret,{ algorithms:  ["HS256"]}, (err,decoded)=>{
      if (err){
        console.log(err)
      }else {
        console.log('decoded',decoded)
      return decoded.userId
    }
    })


    return this._getUserService().get(userId)
      .then(user => {
        let userConfirmation = {approved: confirmation }
        return this._getUserService().patch(userId, userConfirmation)
      })
  }

  getUrlSetPassword(userId) {
    let config = this.options.app.get('auth')
    var accessToken = jwtLib.sign({
      userId: userId
    }, config.secret, {
      expiresIn: config.jwt.resetPasswordExpiresIn,
      issuer: config.jwt.issuer,
      audience: config.jwt.audience,
      subject: config.jwt.subject,
    })
    console.log('accessToken:', accessToken)
    return this.app.get('webEndpoints').setPassword + '?token=' + accessToken
  }



}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
