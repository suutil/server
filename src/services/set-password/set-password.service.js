// Initializes the `set-password` service on path `/reset-password`
const createService = require('./set-password.class.js');
const hooks = require('./set-password.hooks');
const filters = require('./set-password.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'set-password',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/set-password', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('set-password');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
