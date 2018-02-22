// staffs-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
let stripeManagedAccountModel
module.exports = function (app) {
  if (stripeManagedAccountModel) return stripeManagedAccountModel
  const mongooseClient = app.get('mongooseClient');
  const stripeManagedAccount = new mongooseClient.Schema({
    stripeData:{
      type: Object
    }
  });

  stripeManagedAccountModel = mongooseClient.model('stripe-managed-account', stripeManagedAccount)
  return stripeManagedAccountModel
};
