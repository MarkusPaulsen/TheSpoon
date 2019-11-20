'use strict';


/**
 * Creates customer
 * Creates a new customer profile. This endpoint is used only for customer registration.  The endpoint, if the registration succeeds, returns the username of the account as a confirmation.
 *
 * body Customer Customer that needs to register
 * returns Username
 **/
exports.createCustomer = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "username" : "xXEmilioXx"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return data of a specific menu
 * Returns all the data about the menu with given menuID, even the menu items inside it. The photos of the menu items are saved in the Amazon s3 storage, so the links to the cloud storage are also returned. The frontend will directly download them from the cloud storage, they won't be sent by the backend with this endpoint.
 *
 * menuID Integer ID of the menu to be returned
 * returns Menu
 **/
exports.getMenuCustomer = function(menuID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ "Italian food", "Special menu" ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "priceEuros" : 10,
    "tags" : [ "First dish", "Pasta", "Italian food" ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "priceEuros" : 7,
    "tags" : [ "Second dish", "Meat", "Italian food" ],
    "imageLink" : "www.cloudStorage.com/Meatballs"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Search by menu item
 * Returns all the menus with given menu item (dish/drink) with menuID. It also returns the names of the associated restaurants with restaurantID.  The menu items inside every menu are not returned. It will be needed to access the endpoint /api/user/customer/menu/{menuID} to get the menu items of a specific menu (the menuID passed can be obtained from the response of this endpoint, since it returns the menuID of every menu).
 *
 * menuItemName String Name of the desired menu item
 * returns List
 **/
exports.searchByMenuItem = function(menuItemName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "restaurantData" : {
    "restaurantID" : 54,
    "restaurantName" : "Emilio's Pizza"
  },
  "menu" : {
    "menuID" : 1,
    "name" : "Emilio's menu of the day",
    "description" : "Our special menu of today",
    "tags" : [ "Italian food", "Special menu" ]
  }
}, {
  "restaurantData" : {
    "restaurantID" : 54,
    "restaurantName" : "Emilio's Pizza"
  },
  "menu" : {
    "menuID" : 2,
    "name" : "Emilio's menu of the day",
    "description" : "Our special menu of today",
    "tags" : [ "Italian food", "Special menu" ]
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

