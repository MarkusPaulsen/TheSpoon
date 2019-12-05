'use strict';

var utils = require('../utils/writer.js');
var Customer = require('../service/CustomerService');

module.exports.apiUserCustomerGET = function apiUserCustomerGET (req, res, next) {
  Customer.apiUserCustomerGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserCustomerReviewReviewIDDELETE = function apiUserCustomerReviewReviewIDDELETE (req, res, next) {
  var reviewID = req.swagger.params['reviewID'].value;
  Customer.apiUserCustomerReviewReviewIDDELETE(reviewID)
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

module.exports.getItemsOfMenu = function getItemsOfMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Customer.getItemsOfMenu(menuID)
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

module.exports.getMenusOfRestaurant = function getMenusOfRestaurant (req, res, next) {
  var restaurantID = req.swagger.params['restaurantID'].value;
  Customer.getMenusOfRestaurant(restaurantID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOwnReviews = function getOwnReviews (req, res, next) {
  Customer.getOwnReviews()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRestaurants = function getRestaurants (req, res, next) {
  Customer.getRestaurants()
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

module.exports.submitReview = function submitReview (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Customer.submitReview(menuID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
