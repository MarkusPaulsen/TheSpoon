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

module.exports.apiUserCustomerGET = function apiUserCustomerGET (req, res, next) {
  Marin.apiUserCustomerGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserCustomerPasswordPUT = function apiUserCustomerPasswordPUT (req, res, next) {
  var body = req.swagger.params['body'].value;
  Marin.apiUserCustomerPasswordPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerRestaurantReviewGET = function apiUserOwnerRestaurantReviewGET (req, res, next) {
  Marin.apiUserOwnerRestaurantReviewGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerRestaurantReviewReviewIDPOST = function apiUserOwnerRestaurantReviewReviewIDPOST (req, res, next) {
  var reviewID = req.swagger.params['reviewID'].value;
  var body = req.swagger.params['body'].value;
  Marin.apiUserOwnerRestaurantReviewReviewIDPOST(reviewID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createConsultant = function createConsultant (req, res, next) {
  var body = req.swagger.params['body'].value;
  Marin.createConsultant(body)
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

module.exports.getStatisticOfNationality = function getStatisticOfNationality (req, res, next) {
  var nationalityName = req.swagger.params['nationalityName'].value;
  Marin.getStatisticOfNationality(nationalityName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getStatistics = function getStatistics (req, res, next) {
  Marin.getStatistics()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginConsultant = function loginConsultant (req, res, next) {
  var body = req.swagger.params['body'].value;
  Marin.loginConsultant(body)
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
  Marin.submitReview(menuID,body)
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
