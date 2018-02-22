// Initializes the `picture` service on path `/picture`
const createService = require('./picture.class.js');
const hooks = require('./picture.hooks');
const filters = require('./picture.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'picture',
    paginate,
    app
  };

  // Initialize our service with any options it requires
  app.use('/picture', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('picture');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
