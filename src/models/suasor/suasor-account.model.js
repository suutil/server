// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
let suasorAccountModel

module.exports = function (app) {
  if (suasorAccountModel) {
    return suasorAccountModel
  }

  const mongooseClient = app.get('mongooseClient');
  const suasorAccount = new mongooseClient.Schema({
    _id: {
      type: String
    },
    account: {
      type: String
    },
    company: {
      type: String
    },
    type: {
      type: Number
    },
    auxType: {
      type: Number
    }
  });

  suasorAccountModel = mongooseClient.model('suasorAccount', suasorAccount);
  return suasorAccountModel
};
