const {
  authenticate
} = require('feathers-authentication').hooks;
const authenticateHooks = require('feathers-authentication-hooks');

const verifyNotRefershToken = require('../../hooks/verifyNotRefershToken')


module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      verifyNotRefershToken(),
      authenticateHooks.restrictToAuthenticated()
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
