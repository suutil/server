// Initializes the `blog` service on path `/blog`
const createService = require('feathers-mongoose');
const hooks = require('./blog.hooks');
const filters = require('./blog.filters');
const createModel = require('../../models/post.model');


module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');


  const options = {
    name: 'blog',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/blog', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('blog');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
