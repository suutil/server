const authentication = require('feathers-authentication');
const jwt = require('feathers-authentication-jwt');
const local = require('feathers-authentication-local');
const commonHooks = require('feathers-hooks-common');
const errors = require('feathers-errors');


const jwtLib = require('jsonwebtoken');

function createToken(hook, userId) {
  if (!hook.params.user.status) {
    throw new errors.NotAuthenticated('User not active');
  }

  let config = hook.app.get('auth')

  var accessToken = jwtLib.sign({
    userId: userId
  }, config.secret, {
    expiresIn: config.jwt.expiresIn,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience,
    subject: config.jwt.subject
  })
  var refreshToken = jwtLib.sign({
    userId: userId,
    refreshToken: true
  }, config.secret, {
    expiresIn: config.jwt.refresTokenExpiresIn,
    issuer: config.jwt.issuer,
    audience: config.jwt.audience,
    subject: config.jwt.subject
  })

  return hook.app.service('refresh-tokens')
    .create({
      userId,
      refreshToken
    })
    .then(_ => {
      hook.result = {
        data: hook.result.data,
        refreshToken,
        accessToken,
        userId
      }
      return hook;
    })
}


module.exports = function () {
  const app = this
  const config = app.get('authentication')

  // Set up authentication with the secret
  app.configure(authentication(config))
  app.configure(jwt())
  app.configure(local(config.local))


  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        commonHooks.lowerCase('email'),
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        hook => {
          if (hook.data.strategy === 'jwt') {

            let userId = hook.params.payload.userId
            let refreshToken = hook.params.headers.authorization
            return hook.app.service('refresh-tokens')
              .remove(null, {
                query: {
                  userId,
                  refreshToken
                }
              })
              .catch(error => {
                console.error(error)
                throw new errors.GeneralError(new Error('Fail to refresh token'));
              })
              .then(result => {
                if (result.length === 0) {
                  throw new errors.NotAuthenticated('Refresh token not exist');
                } else {
                  return createToken(hook, userId)
                }
              })


          } else {
            let userId = hook.params.user._id.toString()
            return createToken(hook, userId)
          }
        }
      ]
    }
  });
};
