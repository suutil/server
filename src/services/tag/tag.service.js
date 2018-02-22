// Initializes the `tag` service on path `/tag`
const createService = require('feathers-mongoose');
const hooks = require('./tag.hooks');
const filters = require('./tag.filters');
const createModel = require('../../models/tag.model');


module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');


  const options = {
    name: 'tag',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tag', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tag');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
