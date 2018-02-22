'use strict'

module.exports = function() {
  return function (hook) {
    if(hook.params.provider && hook.params.payload.refreshToken){
      throw new errors.NotAuthenticated('Refresh token not allow do a request')
    }
  }
}