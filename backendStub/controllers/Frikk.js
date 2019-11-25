'use strict';

var utils = require('../utils/writer.js');
var Frikk = require('../service/FrikkService');

module.exports.getMenuCustomer = function getMenuCustomer (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Frikk.getMenuCustomer(menuID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOwnMenus = function getOwnMenus (req, res, next) {
  Frikk.getOwnMenus()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.searchByMenuItem = function searchByMenuItem (req, res, next) {
  var menuItemName = req.swagger.params['menuItemName'].value;
  Frikk.searchByMenuItem(menuItemName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
