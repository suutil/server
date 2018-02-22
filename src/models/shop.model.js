// shop-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

let shopModel

module.exports = function (app) {
  if (shopModel) {
    return shopModel
  }

  const mongooseClient = app.get('mongooseClient');
  const shop = new mongooseClient.Schema({
    provider: {
      type: String
    },
    status: {
      type: Boolean,
      default: true
    },
    CIF: {
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
    categories: {
      type: [String]
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
    proConditions: {
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
        type: [String]
    },
    likes: {
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

  shopModel = mongooseClient.model('shop', shop);
  return shopModel
};
