// tag-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

let tagModel

module.exports = function (app) {
  if (tagModel) {
    return tagModel
  }

  const mongooseClient = app.get('mongooseClient');
  const tag = new mongooseClient.Schema({
    tagName: {
      type: String,
      lowercase: true,
      unique: true,
      minlength: 2
    },
    active: {
      type: Boolean,
      'default': true
    },
    taggedShops: {
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

  tagModel = mongooseClient.model('tag', tag);
  return tagModel
};
