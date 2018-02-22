// refreshTokens-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const refreshTokens = new mongooseClient.Schema({
    userId: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String,
      required: true
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

  return mongooseClient.model('refreshTokens', refreshTokens);
};
