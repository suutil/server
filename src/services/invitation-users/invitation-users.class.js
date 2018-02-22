/* eslint-disable no-unused-vars */
const mongoService = require('feathers-mongoose');
const suasorClientModelCreator = require('../../models/suasor/suasor-client.model');
const suasorCompanyModelCreator = require('../../models/suasor/suasor-company.model');


class Service {
  constructor(options) {
    this.app = options.app;
    this.options = options || {};
    this.suasorClientService = mongoService(this.generateMongoOptions(suasorClientModelCreator(this.app)))
    this.suasorCompanyService = mongoService(this.generateMongoOptions(suasorCompanyModelCreator(this.app)))

  }

  generateMongoOptions(model) {
    return {
      Model: model,
      paginate: {
        default: 5,
        max: 25
      }
    }
  }

  _getUserService() {
    return this.options.app.service('users')
  }

  _setSuasorClient(data) {
    return this.suasorClientService.find({
        query: {
          'NIF': data.CIF
        }
      })
      .then(suasorClient => {
        if (suasorClient.data.length === 0) {
          //TODO throw error
        }
        data.suasorClient = suasorClient.data[0]._id
      })
      .catch(_ => {
        //TODO manage this error
      })
  }

  _setSuasorCompany(data) {
    return this.suasorCompanyService.find({
        query: {
          '_id': data.company
        }
      })
      .then(suasorCompany => {
        if (suasorCompany.data.length === 0) {
          //TODO throw error
        }
        data.companyName = suasorCompany.data[0].denominacion
      })
      .catch(_ => {
        //TODO manage this error
      })
  }

  create(data, params) {
    let promiseAddSuasorInfo
    if (data.rol === 'customer') {
      promiseAddSuasorInfo = Promise.all([this._setSuasorClient(data), this._setSuasorCompany(data)]);
    } else {
      promiseAddSuasorInfo = Promise.resolve()
    }

    promiseAddSuasorInfo
      .then(_ => this._getUserService().create(data))
      .then(result => {
        let url = this.app.service('set-password').getUrlSetPassword(result._id)

        /* return this.app.service('mail-template')
            .update('setPassword', {
              name: user.name,
              setPasswordUrl: url
            })

        }).then(mailContent => {
          if (!mailContent) {
            return
          }*/
        return this.app.service('send-mail').create({
          to: data.email,
          subject: 'Activa tu cuenta',
          content: url
        })
      })
      //      })
      .then(_ => {
        return {
          status: 'ok'
        }
      })

  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
