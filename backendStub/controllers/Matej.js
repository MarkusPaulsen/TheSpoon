'use strict';

var utils = require('../utils/writer.js');
var Matej = require('../service/MatejService');

module.exports.configureRestaurant = function configureRestaurant (req, res, next) {
  var body = req.swagger.params['body'].value;
  Matej.configureRestaurant(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
