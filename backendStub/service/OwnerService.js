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
 * Add a menuItem to a menu
 * Add a menuItem to the menu with given menuID. Authentication required. The tags of the menu item must be valid, otherwise a 400 error will be sent. It's needed that the restaurant already exists, otherwise a 404 error will be sent.
 *
 * menuID Integer ID of the menu
 * body MenuItemWithoutColors Menu data
 * returns Menu
 **/
exports.addMenuItem = function(menuID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
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
 * Return pending reviews
 * Return all the pending reviews of the owner's restaurant. Only the image of the receipt is sent (the link to download it from the cloud), together with the name of the reviewed menu and the list of the reviewed menu items.The pending reviews are sent in an array, which will be empty in case there are no pending reviews. With a POST the restaurant owner will approve or disapprove the review.  If there are no pending reviews, an empty array is sent (with code 200, not 404).  It's needed that the restaurant already exists, otherwise a 404 error will be sent.
 *
 * returns List
 **/
exports.apiUserOwnerRestaurantReviewGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "reviewID" : 988,
  "receiptPhotoLink" : "www.cloud.com/receiptPhoto",
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
  } ]
}, {
  "reviewID" : 989,
  "receiptPhotoLink" : "www.cloud.com/receiptPhoto",
  "menuName" : "Mountain menu",
  "menuItemNames" : [ {
    "menuItemName" : "Polenta"
  }, {
    "menuItemName" : "Deer meat"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Approve or disapprove pending review
 * Submit the decision of the restaurant owner about the pending review with given reviewID (approved or disapproved). In case of a successful operation, an array containing all the pending reviews is sent, so that the frontend is able to refresh the list (the array sent is like the array sent with the GET endpoint). It's needed that the restaurant already exists, otherwise a 404 error will be sent.
 *
 * reviewID Integer ID of the pending review
 * body ApprovalStatus Submitted status of pending review (approved or disapproved)
 * returns List
 **/
exports.apiUserOwnerRestaurantReviewReviewIDPOST = function(reviewID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "reviewID" : 988,
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
  } ]
}, {
  "reviewID" : 989,
  "menuName" : "Mountain menu",
  "menuItemNames" : [ {
    "menuItemName" : "Polenta"
  }, {
    "menuItemName" : "Deer meat"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
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
 * Configure data of the restaurant
 * Save the data of the restaurant given by the owner. Authentication is needed. A 400 will be sent if the owner already sent the data of his restaurant (an owner can't have more than one restaurant).  One of the parameter to be passed is the imageID, this is the flow:  1. The restaurant owner is in the page in which he can input the restaurant data. He will upload the photo of the restaurant while he is writing all the fields of the form.  2. The uploading of the photo is done by sending the photo to the /api/image endpoint. While the restaurant owner is still writing the fields of the form, the message to that endpoint is sent and the imageID is received as a response.  3. When the restaurant owner finishes writing the fields of the form and click the send button, the photo was actually already been ent in the point 2 and he doesn't have to wait for the upload (if he was fast compiling the form and the upload isn't finished yet, at least he has to wait less because it was already started). The imageID received as a response by the /api/image endpoint will be sent to this endpoint with the data of the form in a json, because the backend needs it in order to associate the json to the previously uploaded photo.
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
 * returns UsernameAndToken
 **/
exports.createOwner = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "username" : "xXEmilioXx",
  "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjI5LCJpYXQiOjE1NjE5OTg2NjB9.SWYMJXTTM8pe6NQw1QwS-d8Btt6Isuzzk5JtH775uV0"
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
 * Delete a menuItem
 * Delete the menuItem with given menuItemID of the menu with given menuID. Authentication required. It's needed that the restaurant already exists, otherwise a 404 error will be sent.
 *
 * menuID Integer ID of the menu
 * menuItemID Integer ID of the menuItem
 * no response value expected for this operation
 **/
exports.deleteMenuItem = function(menuID,menuItemID) {
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
 * Edit a menuItem
 * Edit the menuItem with given menuItemID of the menu with given menuID. Authentication required. The tags of the menu item must be valid, otherwise a 400 error will be sent. It's needed that the restaurant already exists, otherwise a 404 error will be sent.
 *
 * menuID Integer ID of the menu
 * menuItemID Integer ID of the menuItem
 * body MenuItemWithoutColors Data of the menuItem
 * returns Menu
 **/
exports.editMenuItem = function(menuID,menuItemID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
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
 * Return all the menus of the restaurant
 * Return all the menus of the restaurant. Since authentication is required, the backend is able to get which restaurant is involved from the authentication token. It's needed that the restaurant already exists, otherwise a 404 error will be sent.
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
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "totalScore" : 4,
  "serviceScore" : 3.5,
  "qualityOverPriceScore" : 5,
  "menuItems" : [ {
    "menuItemID" : 20,
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara",
    "rating" : 4.5,
    "menuItemReviews" : {
      "rating" : 4.5,
      "reviews" : [ {
        "username" : "Janine",
        "rating" : 5,
        "content" : "Best pizza I have tasted in ages!"
      }, {
        "username" : "Emilio",
        "rating" : 4,
        "content" : "Nice pizza!"
      } ]
    }
  }, {
    "menuItemID" : 21,
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs",
    "rating" : 4,
    "menuItemReviews" : {
      "rating" : 4.5,
      "reviews" : [ {
        "username" : "Janine",
        "rating" : 5,
        "content" : "Best pizza I have tasted in ages!"
      }, {
        "username" : "Emilio",
        "rating" : 4,
        "content" : "Nice pizza!"
      } ]
    }
  } ]
}, {
  "menuID" : 3,
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "totalScore" : 4,
  "serviceScore" : 3.5,
  "qualityOverPriceScore" : 5,
  "menuItems" : [ {
    "menuItemID" : 30,
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara",
    "rating" : 4.5,
    "menuItemReviews" : {
      "rating" : 4.5,
      "reviews" : [ {
        "username" : "Janine",
        "rating" : 5,
        "content" : "Best pizza I have tasted in ages!"
      }, {
        "username" : "Emilio",
        "rating" : 4,
        "content" : "Nice pizza!"
      } ]
    }
  }, {
    "menuItemID" : 31,
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs",
    "rating" : 4,
    "menuItemReviews" : {
      "rating" : 4.5,
      "reviews" : [ {
        "username" : "Janine",
        "rating" : 5,
        "content" : "Best pizza I have tasted in ages!"
      }, {
        "username" : "Emilio",
        "rating" : 4,
        "content" : "Nice pizza!"
      } ]
    }
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get data of own restaurant
 * Get the data of the restaurant of authenticated owner, so that it can be showed in the 'Your Restaurant' page.
 *
 * returns RestaurantReceived
 **/
exports.getRestaurant = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's Pizza",
  "address" : "Piazzale Susa",
  "city" : "Milan",
  "country" : "Italy",
  "imageLink" : "www.cloudStorage.com/Restaurant",
  "openingHours" : [ {
    "day" : "Monday",
    "openTime" : "12.00",
    "closeTime" : "15.00"
  }, {
    "day" : "Saturday",
    "openTime" : "19.00",
    "closeTime" : "23.59"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

