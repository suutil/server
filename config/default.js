var HOST = process.env.HOST || 'localhost';
var PORT = process.env.PORT || 3030;
var MONGO_HOST = process.env.MONGO_HOST;
var MONGO_PORT = process.env.MONGO_PORT;
var MONGO_USER = process.env.MONGO_USER;
var MONGO_PWD  = process.env.MONGO_PWD;
var MONGO_DB = process.env.MONGO_DB || 'suutil';

var MAIL_USER = process.env.MAIL_USER || '';
var MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';
var MAIL_FROM = process.env.MAIL_FROM || '';
var CONTACT_MAIL = process.env.CONTACT_MAIL || '';
var MANDRILL_KEY = process.env.MANDRILL_KEY || '';
var SET_PASSWORD_ENDPOINT = process.env.SET_PASSWORD_ENDPOINT || '';

var VERSION = ''
try {
  var package = require('../package.json')
  VERSION = package.version
} catch (e) {}

module.exports = {
  host: HOST,
  port: PORT,
  public: "../public/",
  version: VERSION,
  paginate: {
    max: 50
  },
  webEndpoints: {
    setPassword: SET_PASSWORD_ENDPOINT
  },
  authentication: {
    secret: 'NlKEMT2eMLTd7oUvDlN3IyHUmhgdN/jZ1h9AIv4L3Tbz9nmG/oqVwJBGLTmgafhchiZ3T8s0QfFS9qvb17emew==',
    strategies: [
      "jwt",
      "local"
    ],
    path: "/authentication",
    service: "users",
    jwt: {
      header: {
        type: "access"
      },
      audience: "https://yourdomain.com",
      subject: "anonymous",
      issuer: "suutil",
      algorithm: "HS256",
      expiresIn: "2d",
      refresTokenExpiresIn: '30d',
      staffTokenExpirationIn: '2d',
      resetPasswordExpiresIn: '30m',
    },
    local: {
      entity: "user",
      service: "users",
      usernameField: "email",
      passwordField: "password"
    }
  },
  mongodb: 'mongodb://' + MONGO_USER +':'+ MONGO_PWD +'@' + MONGO_HOST + ':' + MONGO_PORT + '/' + MONGO_DB,
  mailConfig: {
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PWD,
    mandrillKey: MANDRILL_KEY,
    from: 'no-reply@suutil.com',
    contactMail: CONTACT_MAIL
  }
}
