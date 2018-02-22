// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

let alertsModel

module.exports = function (app) {
  if (alertsModel) {
    return alertsModel
  }

  const mongooseClient = app.get('mongooseClient');
  const alerts = new mongooseClient.Schema({
    type: {
      type: String,
      required: true
    },
    to: [String],
    from: {
      type: String,
      required: true
    },
    detail: {
      type: String,
      required: true
    },
    customers: {
      type: Object
    },
    date: {
      type: Date
    },
    read: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      'default': Date.now
    },
    updatedAt: {
      type: Date,
      'default': Date.now
    }
  });

  alertsModel = mongooseClient.model('alerts', alerts);
  return alertsModel
};
