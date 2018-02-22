// Initializes the `shops` service on path `/shops`
const createService = require('feathers-mongoose');
const hooks = require('./shops.hooks');
const filters = require('./shops.filters');
const createModel = require('../../models/shop.model');


module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');


  const options = {
    name: 'shops',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/shops', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('shops');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
