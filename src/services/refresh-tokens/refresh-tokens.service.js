// Initializes the `refreshTokens` service on path `/refresh-tokens`
const createService = require('feathers-mongoose');
const createModel = require('../../models/refresh-tokens.model');
const hooks = require('./refresh-tokens.hooks');
const filters = require('./refresh-tokens.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'refresh-tokens',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/refresh-tokens', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('refresh-tokens');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
