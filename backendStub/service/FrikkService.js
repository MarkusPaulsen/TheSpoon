'use strict';


/**
 * Return data of a specific menu
 * Returns all the data about the menu with given menuID, even the menu items inside it. The photos of the menu items are saved in the Amazon s3 storage, so the links to the cloud storage are also returned. The frontend will directly download them from the cloud storage, they won't be sent by the backend with this endpoint.
 *
 * menuID Integer ID of the menu to be returned
 * returns MenuRetrievedToCustomer
 **/
exports.getMenuCustomer = function(menuID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "restaurant" : {
    "restaurantName" : "Emilio's Pizza",
    "address" : "Piazzale Susa",
    "city" : "Milan",
    "country" : "Italy",
    "latitude" : 45.4688346,
    "longitude" : 9.2234114
  },
  "menuName" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuRating" : 5,
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
    }, {
      "name" : "Dinner",
      "color" : "#99C99B"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara",
    "rating" : 4.5
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
    "rating" : 4
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
 * Return all the menus of the restaurant
 * Return all the menus of the restaurant. Since authentication is required, the backend is able to get which restaurant is involved from the authentication token.
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return all the reviews of the customer
 * Return all the reviews of the customer, with their reviewIDs and their status (accepted/refused/pending). Returns an empty array if no review is found.
 *
 * returns List
 **/
exports.getOwnReviews = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "menuID" : 343,
  "serviceRating" : 4.6,
  "qualityOverPriceRating" : 4.7,
  "date" : "2019-12-01",
  "receiptImageID" : 67,
  "status" : "accepted",
  "menuItemsReviews" : [ {
    "menuItemID" : 34,
    "rating" : 4.1,
    "content" : "That was delicious!"
  }, {
    "menuItemID" : 58,
    "rating" : 0.5,
    "content" : "It was an insult, I will never eat that trash again in my whole life"
  } ]
}, {
  "menuID" : 343,
  "serviceRating" : 4.6,
  "qualityOverPriceRating" : 4.7,
  "date" : "2019-12-01",
  "receiptImageID" : 67,
  "status" : "accepted",
  "menuItemsReviews" : [ {
    "menuItemID" : 34,
    "rating" : 4.1,
    "content" : "That was delicious!"
  }, {
    "menuItemID" : 58,
    "rating" : 0.5,
    "content" : "It was an insult, I will never eat that trash again in my whole life"
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
    "restaurantName" : "Emilio's Pizza",
    "restaurantImageLink" : "www.cloudStorage.com/Restaurant"
  },
  "menu" : {
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
    "rating" : 5
  }
}, {
  "restaurantData" : {
    "restaurantName" : "Emilio's Pizza",
    "restaurantImageLink" : "www.cloudStorage.com/Restaurant"
  },
  "menu" : {
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
    "rating" : 5
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Submit a review of the menu
 * Submit a review of the menu with given menuID. The receiptImageID is obtained by the frontend when the photo of the receipt is uploaded through the dedicated endpoint.
 *
 * menuID Integer ID of the menu
 * body MenuReview Review
 * no response value expected for this operation
 **/
exports.submitReview = function(menuID,body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

