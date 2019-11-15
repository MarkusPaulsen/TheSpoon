'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.loginUser = function loginUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  Default.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadImage = function uploadImage (req, res, next) {
  Default.uploadImage()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
