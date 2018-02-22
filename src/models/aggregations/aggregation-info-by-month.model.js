// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
let infoByMonthModel

module.exports = function (app) {
  if (infoByMonthModel) {
    return infoByMonthModel
  }

  const mongooseClient = app.get('mongooseClient');
  const infoByMonthSchema = new mongooseClient.Schema({
    _id: {
      type: String
    },
    company: {
      type: String
    },
    incomes: {
      type: Number
    },
    expenses: {
      type: Number
    },
    iva: {
      type: Number
    },
    irpf: {
      type: Number
    },
    ss: {
      type: Number
    },
    sociedades: {
      type: Number
    },
    salary: {
      type: Number
    },
    paysheetAmount: {
      type: Number
    },
    startPeriod: {
      type: Date
    },
  });

  infoByMonthModel = mongooseClient.model('aggregateInfoByMonth', infoByMonthSchema);
  return infoByMonthModel
};
