'use strict';


/**
 * Add an empty menu to a restaurant
 * Add a menu to a restaurant of a restaurant owner, which needs to be logged in. The menuItems are not meant to be added to the menu through this endpoint. The tags of the menu must be valid, otherwise a 400 error will be sent. It's needed that the restaurant already exists, otherwise a 404 error will be sent.
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
 * Delete profile of the owner
 * Delete profile of the logged in owner.
 *
 * no response value expected for this operation
 **/
exports.apiUserOwnerDELETE = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Return profile data of the owner
 * Return own data of logged in owner. This endpoint should be used when the frontend has to visualize the profile of the owner.
 *
 * returns OwnerData
 **/
exports.apiUserOwnerGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "email" : "john.doe@gmail.com",
  "username" : "johndoe",
  "name" : "John",
  "surname" : "Doe"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit profile data of the owner
 * Edit profile data of the logged in owner. The password can't be changed through this endpoint, but the dedicated one should be used instead.  The username can't be changed.
 *
 * body OwnerEditData New data of the owner
 * returns OwnerData
 **/
exports.apiUserOwnerPUT = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "email" : "john.doe@gmail.com",
  "username" : "johndoe",
  "name" : "John",
  "surname" : "Doe"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Change the password of the owner
 * Change the password of the logged in owner. The current password must be provided, for security reasons. A 400 is sent back if the current password provided doesn't match, and the password change is not performed.
 *
 * body PasswordChange New and current passwords
 * no response value expected for this operation
 **/
exports.apiUserOwnerPasswordPUT = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Return all the available tags
 * When a restaurant owner is creating a menu or a menu item, he/she needs to know the list of the available tags. If there are no tags, an empty array is sent (with code 200, not 404).
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
 * Delete a menu of the restaurant. Authentication is required. It's needed that the restaurant already exists, otherwise a 404 error will be sent.
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
 * Edit a given menu (but not its menuItems). To identify the menu, the menuID needs to be given. Authentication is required. The tags of the menu must be valid, otherwise a 400 error will be sent. It's needed that the restaurant already exists, otherwise a 404 error will be sent.
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
 * Edit the information of the restaurant. It's needed that the restaurant already exists, otherwise a 404 error will be sent. The POST endpoint should be used to create it.
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
 * Return all the menu items of given menu.  In case no menu item is found, an empty array is sent (with code 200, not 404).
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
 * Return all the names of the menus of the restaurant and their menuIDs. Only menus that contain at least one menu item are actually sent.  In case no menu is found, an empty array is sent (with code 200, not 404). 
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
 * Return all the names of the restaurants and their restaurantIDs. Only the restaurants that actually contain menus are actually sent, because a menu has to be reviewed, so it wouldn't make sense to send restaurant with no menus. Moreover, at least one menu of the restaurant must have at least one menu item inside.  In case no restaurant is found, an empty array is sent (with code 200, not 404).
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

