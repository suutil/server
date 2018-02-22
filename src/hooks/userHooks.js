'use strict';

const errors = require('feathers-errors');
const bcrypt = require('bcryptjs');
const callbackToPromise = require('feathers-hooks-common').callbackToPromise;

exports.currentPasswordVerifier = function (mandatory) {
  var isMandatory = mandatory;
  return function (hook) {
    var currentPassword = ''
    if (hook.data && hook.data.currentPassword) {
      currentPassword = hook.data.currentPassword;
    } else if (hook.params.query && hook.params.query.currentPassword) {
      currentPassword = hook.params.query.currentPassword;
      delete hook.params.query.currentPassword;
    }

    var password = hook.params.user.password;
    const wrappedBcryptCompare = callbackToPromise(bcrypt.compare, 2);

    return wrappedBcryptCompare(currentPassword, password).then(
      result => {
        if (!result) {
          if (isMandatory) {
            throw new errors.NotAuthenticated('Incorrect password', {
              validToken: true
            });
          }
        } else {
          hook.params.currentPasswordVerified = true;
        }

        return hook;
      });
  }
}

exports.passwordUpdateRequireCurrentPasswordVerified = function () {
  return function (hook) {
    if (!hook.data.currentPassword && hook.data.password) {
      throw new errors.BadRequest('Current password is missing');
    }

    if (!hook.data.password || hook.data.password && hook.params.currentPasswordVerified) {
      return hook
    }

    throw new errors.NotAuthenticated('Incorrect password', {
      validToken: true
    });
  }
}
