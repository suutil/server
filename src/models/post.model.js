// post-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

let postModel

module.exports = function (app) {
  if (postModel) {
    return postModel
  }

  const mongooseClient = app.get('mongooseClient');
  const post = new mongooseClient.Schema({
    title: {
      type: String,
      minlength: 2
    },
    subtitle: {
      type: String,
    },
    content: {
      type: String
    },
    mainImage: {
      type: Boolean,
      'default': false
    },
    comment1: {
      type: String
    },
    comment2: {
      type: String
    },
    comment3: {
      type: String
    },
    comment4: {
      type: String
    },
    comment5: {
      type: String
    },
    comment6: {
      type: String
    },
    comment7: {
      type: String
    },
    comment8: {
      type: String
    },
    comment9: {
      type: String
    },
    link1: {
      type: String
    },
    link2: {
      type: String
    },
    link3: {
      type: String
    },
    link4: {
      type: String
    },
    link5: {
      type: String
    },
    link6: {
      type: String
    },
    link7: {
      type: String
    },
    link8: {
      type: String
    },
    link9: {
      type: String
    },
    active: {
      type: Boolean,
      'default': false
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

  postModel = mongooseClient.model('post', post);
  return postModel
};
