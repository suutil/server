// Initializes the `invitationUsers` service on path `/invitation-users`
const createService = require('./company-info.class');
const hooks = require('./company-info.hooks');
const filters = require('./company-info.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'company-info',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/company-info', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('company-info');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
