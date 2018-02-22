// Initializes the `set-password` service on path `/confirmation`
const createService = require('./confirmation-mail.class.js');
const hooks = require('./confirmation-mail.hooks');
const filters = require('./confirmation-mail.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'confirmation-mail',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/confirmation-mail', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('confirmation-mail');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
