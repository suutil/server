/* eslint-disable no-unused-vars */

//let StripeConnectService = require('./StripeConnectService')
const errors = require('feathers-errors');
const mongoService = require('feathers-mongoose')
const userModel = require('../../models/users.model');
const userService = require('../users/users.service')
const userHooks = require('../users/users.hooks');

class Service {

    constructor(options) {
        this.app = options.app;
        this.options = options || {};
    }

    _getUserService() {
        return this.options.app.service('users')
    }

    _getFavoriteService() {
        return this.options.app.service('favorites')
    }

    _getShopsService() {
        return this.options.app.service('shops')
    }

    update(id, data, params) {
        return this._getUserService().patch(id,
          data)}


    find(params) {
      console.log(params)
        let that = this;
        let favoriteShops = this._getUserService().find(params).then(user => {
          console.log(user)
            let favorites = [];
            let favoritesId = user[0].favorites
            if (favoritesId !== undefined && favoritesId.length > 0) {
                favoritesId.forEach(function(i) {
                    favorites.push(that._getShopsService().get(i))
                });
                return Promise.all(favorites);
            } else {
                let emptyArrayPromise = new Promise(function(resolve, reject) {
                    resolve([]);
                });
                return emptyArrayPromise
            }
        }
      )
        return favoriteShops
    }

    generateMongoOptions(model) {
        return {
            Model: model,
            paginate: {
                max: 25
            }
        }
    }
}

module.exports = function(options, stripeManagedAcountService) {
    return new Service(options, stripeManagedAcountService);
};

module.exports.Service = Service;
