// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
let suasorCompanyModel

module.exports = function (app) {
  if (suasorCompanyModel) {
    return suasorCompanyModel
  }

  const mongooseClient = app.get('mongooseClient');
  const suasorCompany = new mongooseClient.Schema({
    _id: {
      type: String
    },
    denominacion: {
      type: String
    },
    clientNIF: {
      type: String
    }
  });

  suasorCompanyModel = mongooseClient.model('suasorCompany', suasorCompany);
  return suasorCompanyModel
};
