// Initializes the `sendMail` service on path `/send-mail`
const createService = require('./send-mail.class.js');
const hooks = require('./send-mail.hooks');
const filters = require('./send-mail.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  let mailConfig = app.get('mailConfig')
  const options = {
    name: 'send-mail',
    paginate,
    mailConfig
  };

  // Initialize our service with any options it requires
  app.use('/send-mail', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('send-mail');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
