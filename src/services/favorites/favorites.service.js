// Initializes the `favorites` service on path `/favorites`
const createService = require('feathers-mongoose');
const hooks = require('./favorites.hooks');
const filters = require('./favorites.filters');
const createModel = require('../../models/favorites.model');


module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');


  const options = {
    name: 'favorites',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/favorites', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('favorites');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
