/* eslint-disable no-unused-vars */

//let StripeConnectService = require('./StripeConnectService')
const errors = require('feathers-errors');
const AWS = require('aws-sdk');
const myCredentials = { accessKeyId: process.env.AWS_KEY, secretAccessKey: process.env.AWS_SECRET_KEY  }
const mongoService = require('feathers-mongoose')
const myConfig = new AWS.Config({
  credentials: myCredentials, region: 'eu-west-1'
})

const s3 = new AWS.S3(myConfig)
const shopModel = require('../../models/shop.model');
const shopsService = require('../shops/shops.service')
const shopsHooks = require('../shops/shops.hooks');

class Service {

  constructor(options) {
    this.app = options.app;
    this.options = options || {};
  }

  _getShopsService() {
    return this.options.app.service('shops')
  }

  _getBlogService(){
    return this.options.app.service('blog')
  }






uploadToS3(key, file){

  var regex = /^data:.+\/(.+);base64,$/;
  let comma = file.slice(0, 50).indexOf(',')
  let header = file.slice(0, comma + 1)
  var matches = header.match(regex);
  var ext = matches[1];
  var data = file.slice(comma + 1)
  var buffer = new Buffer(data, 'base64');




  let params = {
    ACL:'public-read',
    Bucket: 'suutil-images',
    Key: key,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  }
  var res, rej

  var promise = new Promise((_res, _rej) => {
    res = _res
    rej = _rej
  })

  s3.upload(params, function(err, data) {
    if (err) rej(err); // an error occurred
  else       res({
       data
    })
  });
    return promise
}


  update(id, data, params) {
    if (data.sync) {
      return this.syncData(params.user, params.headers._ip)
    } else if (data.image) {
      let type = data.type
      return this.uploadToS3(id+'.'+ data.type, data.data).then(response=>{
        let imageData = {};
        imageData[data.type]= response.data.Location;
        if(data.collection === 'shop'){
        return this._getShopsService().patch(id, imageData)
        .then(r=> {return response.data} )
        }
        else if (data.collection === 'blog'){
          return this._getBlogService().update(id,{mainImage: true})
          .then(r=> {return response.data} )
        }
        else {
          return response
        }
      }
       )
    } else {
      return Promise.reject(new errors.BadRequest())
    }
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

module.exports = function (options, stripeManagedAcountService) {
  return new Service(options, stripeManagedAcountService);
};

module.exports.Service = Service;
