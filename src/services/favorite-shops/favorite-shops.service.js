// Initializes the `favorite-shops` service on path `/favorite-shops`
const createService = require('./favorite-shops.class.js');
const hooks = require('./favorite-shops.hooks');
const filters = require('./favorite-shops.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'favorite-shops',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/favorite-shops', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('favorite-shops');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
