/* eslint-disable no-unused-vars */
const mongoService = require('feathers-mongoose');
const infoByMonthModelCreator = require('../../models/aggregations/aggregation-info-by-month.model');
const moment = require('moment-timezone')


class Service {
  constructor(options) {
    this.app = options.app;
    this.options = options || {};
    this.infoByMonthService = mongoService(this.generateMongoOptions(infoByMonthModelCreator(this.app)))
  }

  generateMongoOptions(model) {
    return {
      Model: model,
      paginate: {
        default: 5,
        max: 50
      }
    }
  }

  _getUserService() {
    return this.options.app.service('users')
  }

  find(params) {
    //TEST COMPANY: A28885614

    let profitData = {}
    return this._getUserService().get(params.query.userId)
      .then(user => {
        //TODO company from user
        return this.getAllInfo('A28885614')
      })
  }

  getAllInfo(company) {
    return this._getAllInfoPaginated(company, 50, 0, [])
  }

  _getAllInfoPaginated(company, pageSize, page, allInfo) {
    return this.infoByMonthService
      .find({
        query: {
          company,
          $limit: pageSize,
          $skip: pageSize * page,
          $sort: {
            startPeriod: 1
          }
        }
      })
      .then(currentInfo => {
        allInfo = allInfo.concat(currentInfo.data)
        if (currentInfo.total > (page + 1) * pageSize) {
          return this._getAllInfoPaginated(company, pageSize, page + 1, allInfo)
        } else {
          return allInfo
        }
      })

  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
