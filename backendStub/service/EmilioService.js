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

