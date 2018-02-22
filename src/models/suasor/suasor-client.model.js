// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
let suasorClientModel

module.exports = function (app) {
  if (suasorClientModel) {
    return suasorClientModel
  }

  const mongooseClient = app.get('mongooseClient');
  const suasorClient = new mongooseClient.Schema({
    _id: {
      type: String
    },
    denominacion: {
      type: String
    },
    NIF: {
      type: String
    }
  });

  suasorClientModel = mongooseClient.model('suasorClient', suasorClient);
  return suasorClientModel
};
