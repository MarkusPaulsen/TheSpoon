'use strict';


/**
 * Delete profile of the customer
 * Delete profile of the logged in customer.
 *
 * no response value expected for this operation
 **/
exports.apiUserCustomerDELETE = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Return all the reviews of the menu item
 * Return all the reviews of the menu item with given menuItemID contained in the menu with given menuID. If there are no reviews, an empty array is sent (with code 200, not 404).
 *
 * menuID Integer ID of the menu
 * menuItemID Integer ID of the menu item
 * returns List
 **/
exports.apiUserCustomerMenuMenuIDMenuItemMenuItemIDReviewGET = function(menuID,menuItemID) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "username" : "Janine",
  "rating" : 5,
  "content" : "Best pizza I have tasted in ages!",
  "date" : "2019-12-01"
}, {
  "username" : "Janine",
  "rating" : 5,
  "content" : "Best pizza I have tasted in ages!",
  "date" : "2019-12-01"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit profile data of the customer
 * Edit profile data of the logged in customer. All the customer data must be sent with this endpoint, even if it's not changed (in that case the fields must contain the current values). The password can't be changed through this endpoint, but the dedicated one should be used instead.  Valid values for Gender are 'Male/Female/Other'.  The username, the name and the surname can't be changed.  The age is a range, for example '24-34'.
 *
 * body CustomerEditData New data of the customer
 * returns CustomerData
 **/
exports.apiUserCustomerPUT = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "username" : "emilio_imperiali",
  "email" : "emilioimperiali@mail.it",
  "gender" : "Male",
  "ageRange" : "24-34",
  "nationality" : "Italy"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a review
 * Delete the review with the given reviewID. This will also delete the reviews of the menu items associated to the review with given reviewID. The review must belong to the authenticated customer, otherwise a 403 error will be sent.
 *
 * reviewID Integer ID of the review
 * no response value expected for this operation
 **/
exports.apiUserCustomerReviewReviewIDDELETE = function(reviewID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


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
    "longitude" : 9.2234114,
    "openingHours" : [ {
      "day" : "Wednesday",
      "openTime" : "12.30",
      "closeTime" : "14.30"
    }, {
      "day" : "Saturday",
      "openTime" : "12.00",
      "closeTime" : "15.00"
    } ]
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
 * Return all the reviews of the customer
 * Return all the reviews of the customer, with their reviewIDs and their status (accepted/refused/pending). Returns an empty array if no review is found (with code 200, not 404).
 *
 * returns List
 **/
exports.getOwnReviews = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "menuReviewID" : 34342,
  "menuID" : 343,
  "menuName" : "Fish menu",
  "restaurantName" : "Emilio's Restaurant",
  "serviceRating" : 4.6,
  "qualityOverPriceRating" : 4.7,
  "date" : "2019-12-01",
  "receiptImageID" : 67,
  "status" : "accepted",
  "menuItemsReviews" : [ {
    "menuItemID" : 34,
    "menuItemName" : "Pizza margherita",
    "rating" : 4.1,
    "content" : "That was delicious!"
  }, {
    "menuItemID" : 58,
    "menuItemName" : "Pasta alla carbonara with cream",
    "rating" : 0.5,
    "content" : "It was an insult, I will never eat that trash again in my whole life"
  } ]
}, {
  "menuReviewID" : 34342,
  "menuID" : 343,
  "menuName" : "Fish menu",
  "restaurantName" : "Emilio's Restaurant",
  "serviceRating" : 4.6,
  "qualityOverPriceRating" : 4.7,
  "date" : "2019-12-01",
  "receiptImageID" : 67,
  "status" : "accepted",
  "menuItemsReviews" : [ {
    "menuItemID" : 34,
    "menuItemName" : "Pizza margherita",
    "rating" : 4.1,
    "content" : "That was delicious!"
  }, {
    "menuItemID" : 58,
    "menuItemName" : "Pasta alla carbonara with cream",
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
 * Returns all the menus with given menu item (dish/drink) with menuID. It also returns the names of the associated restaurants with restaurantID.  The menu items inside every menu are not returned. It will be needed to access the endpoint /api/user/customer/menu/{menuID} to get the menu items of a specific menu (the menuID passed can be obtained from the response of this endpoint, since it returns the menuID of every menu).  The customer can be not logged in, if that is the case then the authentication token must be sent with a null value. The authentication in this endpoint is necessary to collect the search done by the customer and use it to collect statistics.
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
    "restaurantImageLink" : "www.cloudStorage.com/Restaurant",
    "distance" : 10
  },
  "menu" : {
    "menuID" : 2,
    "name" : "Emilio's menu of the day",
    "description" : "Our special menu of today",
    "averagePrice" : 9.5,
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
    "restaurantImageLink" : "www.cloudStorage.com/Restaurant",
    "distance" : 7.5
  },
  "menu" : {
    "menuID" : 3,
    "name" : "Emilio's menu of the day",
    "description" : "Our special menu of today",
    "averagePrice" : 9.5,
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

