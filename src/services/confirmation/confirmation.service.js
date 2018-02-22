// Initializes the `confirmation` service on path `/reconfirmation`
const createService = require('./confirmation.class.js');
const hooks = require('./confirmation.hooks');
const filters = require('./confirmation.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'confirmation',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/confirmation', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('confirmation');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
