'use strict';

var utils = require('../utils/writer.js');
var Customer = require('../service/CustomerService');

module.exports.apiUserCustomerMenuMenuIDGET = function apiUserCustomerMenuMenuIDGET (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Customer.apiUserCustomerMenuMenuIDGET(menuID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserCustomerMenuSearchByMenuItemGET = function apiUserCustomerMenuSearchByMenuItemGET (req, res, next) {
  var menuItemName = req.swagger.params['menuItemName'].value;
  Customer.apiUserCustomerMenuSearchByMenuItemGET(menuItemName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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
