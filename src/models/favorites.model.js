// favorites-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

let favoritesModel

module.exports = function (app) {
  if (favoritesModel) {
    return favoritesModel
  }

  const mongooseClient = app.get('mongooseClient');
  const favorites = new mongooseClient.Schema({
      user: {
      type: String
    },
    favorites: {
      type: [String]
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

  favoritesModel = mongooseClient.model('favorites', favorites);
  return favoritesModel
};
