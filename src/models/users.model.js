// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

let usersModel

module.exports = function (app) {
  if (usersModel) {
    return usersModel
  }

  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String
    },
    company: {
      type: String
    },
    CIF: {
      type: String
    },
    rol: {
      type: String,
      required: true
    },
    status: {
      type: Boolean,
      default: true
    },
    greeted: {
      type: Boolean,
      default: false
    },
    suasorClient: {
      type: String
    },
    companyName: {
      type: String
    },
    applicationUrl: {
      type: String
    },
    approved: {
      type: Boolean,
      default: false
    },
    logo: {
      type: Boolean,
      default: false
    },
    banner: {
      type: Boolean,
      default: false
    },
    picture1: {
      type: Boolean,
      default: false
    },
    picture2: {
      type: Boolean,
      default: false
    },
    shopName: {
      type: String
    },
    description: {
      type: String
    },
    shortDescription: {
      type: String
    },
    category: {
      type: String
    },
    country: {
      type: String
    },
    payment: {
      type: String
    },
    paymentMethod: {
      type: String
    },
    shippingMethod: {
      type: String
    },
    contactMail: {
      type: String
    },
    phone: {
      type: String
    },
    address: {
      type: String
    },
    hours: {
      type: String
    },
    webLink: {
      type: String
    },
    instagram: {
      type: String
    },
    pinterest: {
      type: String
    },
    linkedin: {
      type: String
    },
    facebook: {
      type: String
    },
    tags: {
        type: Array,
        default: []
    },
    favorites:[String],
    likes: {
      type: Number,
      default: 0,
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

  usersModel = mongooseClient.model('users', users);
  return usersModel
};
