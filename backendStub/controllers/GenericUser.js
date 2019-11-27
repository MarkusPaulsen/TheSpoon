'use strict';

var utils = require('../utils/writer.js');
var GenericUser = require('../service/GenericUserService');

module.exports.loginUser = function loginUser (req, res, next) {
  var body = req.swagger.params['body'].value;
  GenericUser.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadImage = function uploadImage (req, res, next) {
  GenericUser.uploadImage()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
