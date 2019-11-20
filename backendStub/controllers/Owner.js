'use strict';

var utils = require('../utils/writer.js');
var Owner = require('../service/OwnerService');

module.exports.addMenu = function addMenu (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.addMenu(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addMenuItem = function addMenuItem (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Owner.addMenuItem(menuID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.configureRestaurant = function configureRestaurant (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.configureRestaurant(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createOwner = function createOwner (req, res, next) {
  var body = req.swagger.params['body'].value;
  Owner.createOwner(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMenu = function deleteMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Owner.deleteMenu(menuID)
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
  Owner.deleteMenuItem(menuID,menuItemID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editMenu = function editMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Owner.editMenu(menuID,body)
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
  Owner.editMenuItem(menuID,menuItemID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOwnMenus = function getOwnMenus (req, res, next) {
  Owner.getOwnMenus()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRestaurant = function getRestaurant (req, res, next) {
  Owner.getRestaurant()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
