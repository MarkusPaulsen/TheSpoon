'use strict';

var utils = require('../utils/writer.js');
var Frikk = require('../service/FrikkService');

module.exports.apiUserCustomerMenuMenuIDMenuItemMenuItemIDReviewGET = function apiUserCustomerMenuMenuIDMenuItemMenuItemIDReviewGET (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var menuItemID = req.swagger.params['menuItemID'].value;
  Frikk.apiUserCustomerMenuMenuIDMenuItemMenuItemIDReviewGET(menuID,menuItemID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

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

module.exports.getOwnReviews = function getOwnReviews (req, res, next) {
  Frikk.getOwnReviews()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRestaurant = function getRestaurant (req, res, next) {
  Frikk.getRestaurant()
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

module.exports.submitReview = function submitReview (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Frikk.submitReview(menuID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
