'use strict';


/**
 * Add a menu to a restaurant
 * Add a menu to a restaurant of a restaurant owner, which needs to be logged in
 *
 * body Menu Menu data
 * returns MenuID
 **/
exports.addMenu = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "menuID" : 2
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Configure data of the restaurant
 * Save the data of the restaurant given by the owner. Authentication is needed.  One of the parameter to be passed is the imageID, this is the flow:  1. The restaurant owner is in the page in which he can input the restaurant data. He will upload the photo of the restaurant while he is writing all the fields of the form.  2. The uploading of the photo is done by sending the photo to the /api/image endpoint. While the restaurant owner is still writing the fields of the form, the message to that endpoint is sent and the imageID is received as a response.  3. When the restaurant owner finishes writing the fields of the form and click the send button, the photo was actually already been ent in the point 2 and he doesn't have to wait for the upload (if he was fast compiling the form and the upload isn't finished yet, at least he has to wait less because it was already started). The imageID received as a response by the /api/image endpoint will be sent to this endpoint with the data of the form in a json, because the backend needs it in order to associate the json to the previously uploaded photo.
 *
 * body Restaurant Restaurant data
 * returns RestaurantID
 **/
exports.configureRestaurant = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "restaurantID" : 54
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Creates restaurant owner
 * Creates a new restaurant owner profile. This endpoint is used only for restaurant owner registration.  The endpoint, if the registration succeeds, returns the username of the account as a confirmation.
 *
 * body Owner Restaurant owner that needs to register
 * returns Username
 **/
exports.createOwner = function(body) {
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
 * Edit a menu
 * Edits a given menu. To identify the menu, the menuID needs to be given. When the get that returns all the menus of the restaurant is performed, the menuID of each menu is also returned, so the menuID can be taken from there. Authentication is required.
 *
 * menuID Integer ID of the menu to be edited
 * body Menu Data of the menu to be saved
 * returns MenuID
 **/
exports.editMenu = function(menuID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "menuID" : 2
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return data of a specific menu of the owner
 * Returns all the data about the menu with given menuID, even the menu items inside it. The photos of the menu items are saved in the Amazon s3 storage, so the links to the cloud storage are also returned. The frontend will directly download them from the cloud storage, they won't be sent by the backend with this endpoint.  The menuID should be related to a menu of the restaurant owned by the authenticated restaurant owner, otherwise an error response will be received.
 *
 * menuID Integer ID of the menu to be returned
 * returns Menu
 **/
exports.getMenuOwner = function(menuID) {
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
 * Returns all the menus of the restaurant
 * Returns all the menus of the restaurant. Since authentication is required, the backend is able to get which restaurant is involved from the authentication token. It also returns the ID of each menu, that can be in the post and in the get of the endpoint /api/user/owner/restaurant/menu/{menuID}.  It's important to underline that this endpoint doesn't provide the menu items of the menus. In order to receive them a get to the other mentioned endpoint is necessary.
 *
 * returns List
 **/
exports.getOwnMenus = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "menuID" : 2,
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ "Italian food", "Special menu" ]
}, {
  "menuID" : 2,
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ "Italian food", "Special menu" ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

