'use strict';

var utils = require('../utils/writer.js');
var Customer = require('../service/CustomerService');

module.exports.createCustomer = function createCustomer (req, res, next) {
  var body = req.swagger.params['body'].value;
  Customer.createCustomer(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMenuCustomer = function getMenuCustomer (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Customer.getMenuCustomer(menuID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchByMenuItem = function searchByMenuItem (req, res, next) {
  var menuItemName = req.swagger.params['menuItemName'].value;
  Customer.searchByMenuItem(menuItemName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
