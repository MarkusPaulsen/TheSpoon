'use strict';

var utils = require('../utils/writer.js');
var Marin = require('../service/MarinService');

module.exports.addMenuItem = function addMenuItem (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Marin.addMenuItem(menuID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMenuItem = function deleteMenuItem (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var menuItemID = req.swagger.params['menuItemID'].value;
  Marin.deleteMenuItem(menuID,menuItemID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editMenuItem = function editMenuItem (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var menuItemID = req.swagger.params['menuItemID'].value;
  var body = req.swagger.params['body'].value;
  Marin.editMenuItem(menuID,menuItemID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.uploadImage = function uploadImage (req, res, next) {
  Marin.uploadImage()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
