// Initializes the `invitationUsers` service on path `/invitation-users`
const createService = require('./invitation-users.class.js');
const hooks = require('./invitation-users.hooks');
const filters = require('./invitation-users.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'invitation-users',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/invitation-users', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('invitation-users');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
