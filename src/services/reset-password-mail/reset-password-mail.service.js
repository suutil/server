// Initializes the `set-password` service on path `/reset-password`
const createService = require('./reset-password-mail.class.js');
const hooks = require('./reset-password-mail.hooks');
const filters = require('./reset-password-mail.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'reset-password-mail',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/reset-password-mail', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('reset-password-mail');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
