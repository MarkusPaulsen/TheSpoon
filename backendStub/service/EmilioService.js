'use strict';


/**
 * Add an empty menu to a restaurant
 * Add a menu to a restaurant of a restaurant owner, which needs to be logged in. The menuItems are not meant to be added to the menu through this endpoint.
 *
 * body MenuWithoutItems Menu data
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
 * Return all the available tags
 * When a restaurant owner is creating a menu or a menu item, he/she needs to know the list of the available tags.
 *
 * returns List
 **/
exports.apiUserOwnerTagGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ "Italian", "Dinner" ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a menu
 * Delete a menu of the restaurant. Authentication is required
 *
 * menuID Integer ID of the menu to be edited
 * no response value expected for this operation
 **/
exports.deleteMenu = function(menuID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit a menu's information (not its items)
 * Edit a given menu (but not its menuItems). To identify the menu, the menuID needs to be given. Authentication is required.
 *
 * menuID Integer ID of the menu to be edited
 * body MenuWithoutItems Data of the menu to be saved
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
 * Edit restaurant's information
 * Edit the information of the restaurant
 *
 * body Restaurant Restaurant data
 * returns RestaurantID
 **/
exports.editRestaurant = function(body) {
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
 * Return all the menu items of given menu
 * Return all the names of the restaurants and their restaurantIDs.
 *
 * menuID Integer ID of the menu
 * returns List
 **/
exports.getItemsOfMenu = function(menuID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "Pasta alla carbonara",
  "menuItemID" : 802
}, {
  "name" : "Pizza margherita",
  "menuItemID" : 803
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return all the menus of given restaurant
 * Return all the names of the menus of the restaurant and their menuIDs.
 *
 * restaurantID Integer ID of the restaurant
 * returns List
 **/
exports.getMenusOfRestaurant = function(restaurantID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "Emilio's menu of the day",
  "menuID" : 420
}, {
  "name" : "Fish menu",
  "menuID" : 421
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return all the restaurants
 * Return all the names of the restaurants and their restaurantIDs.
 *
 * returns List
 **/
exports.getRestaurants = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "name" : "Emilio's Pizza",
  "restaurantID" : 520
}, {
  "name" : "Emilio's Piadineria",
  "restaurantID" : 521
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

