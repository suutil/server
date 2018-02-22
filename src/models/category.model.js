// category-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

let categoryModel

module.exports = function (app) {
  if (categoryModel) {
    return categoryModel
  }

  const mongooseClient = app.get('mongooseClient');
  const category = new mongooseClient.Schema({
    upperCaseName: {
      type: String,
      unique: true,
      uppercase: true,
      minLength: 2
    },
    categoryName: {
      type: String,
    },
    type: {
      type: String,
      enum: ['category', 'subcategory']
    },
    subCategories: {
      type: [String]
    },
    parentCategory: {
      type: String
    },
    enabled: {
      type: Boolean,
      default: true
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

  categoryModel = mongooseClient.model('category', category);
  return categoryModel
};
