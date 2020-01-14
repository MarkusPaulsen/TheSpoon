'use strict';


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
 * Return profile data of the customer
 * Return own data of the logged in customer. This endpoint should be used when the frontend has to visualize the profile of the customer.
 *
 * returns CustomerData
 **/
exports.apiUserCustomerGET = function() {
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
 * Change the password of the customer
 * Change the password of the logged in customer. The current password must be provided, for security reasons. A 400 is sent back if the current password provided doesn't match, and the password change is not performed.
 *
 * body PasswordChange New and current passwords
 * no response value expected for this operation
 **/
exports.apiUserCustomerPasswordPUT = function(body) {
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
  "reviewID" : 988,
  "receiptPhotoLink" : "www.cloud.com/receiptPhoto",
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
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
  "reviewID" : 988,
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
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
 * Creates consultant
 * Creates a new consultant profile. This endpoint is used only for consultant registration. Since the consultant is a special user, it is required that a secret word of the company is sent in order to register, that secred word is stored in the backend as an environment variable.  The endpoint, if the registration succeeds, returns the username of the account as a confirmation.
 *
 * body Consultant Consultant that needs to register
 * returns UsernameAndToken
 **/
exports.createConsultant = function(body) {
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
 * Return statistics of a specific nationality
 * Return the statistics of the given nationality. The consultant must be logged in to access this endpoint (reserved to him).
 *
 * nationalityName String Nationality
 * returns StatisticsOfNationality
 **/
exports.getStatisticOfNationality = function(nationalityName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "totalRegisteredCustomers" : 120,
  "customersPerGender" : [ {
    "gender" : "Male",
    "numberOfCustomers" : 10
  }, {
    "gender" : "Female",
    "numberOfCustomers" : 8
  }, {
    "gender" : "Other",
    "numberOfCustomers" : 3
  } ],
  "customersPerAgeRange" : [ {
    "ageRange" : "18-25",
    "numberOfCustomers" : 34
  }, {
    "ageRange" : "25-35",
    "numberOfCustomers" : 28
  }, {
    "ageRange" : "35-50",
    "numberOfCustomers" : 15
  } ],
  "numberOfSearchesPerWord" : [ {
    "word" : "Pasta",
    "numberOfSearches" : 51
  }, {
    "word" : "Pizza",
    "numberOfSearches" : 83
  }, {
    "word" : "Spaghetti",
    "numberOfSearches" : 31
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
 * Return the global statistics
 * Return the aggregate statistics of ALL the users/restaurants in the application. The consultant must be logged in to access this endpoint (reserved to him). To be more precise, this is what is sent:   - The total number of registered customers  - For each nationality, the number of customers  - For each gender, the number of customers  - For each age range, the number of customers  - For each searched word, the number of customers  - List of all the menu names with their ratings. It will be frontend's duty to sort them and show the top 10 and the bottom 10
 *
 * returns Statistics
 **/
exports.getStatistics = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "totalRegisteredCustomers" : 120,
  "customersPerNationality" : [ {
    "nationality" : "Italy",
    "numberOfCustomers" : 10
  }, {
    "nationality" : "French",
    "numberOfCustomers" : 8
  }, {
    "nationality" : "Croatian",
    "numberOfCustomers" : 11
  } ],
  "customersPerGender" : [ {
    "gender" : "Male",
    "numberOfCustomers" : 10
  }, {
    "gender" : "Female",
    "numberOfCustomers" : 8
  }, {
    "gender" : "Other",
    "numberOfCustomers" : 3
  } ],
  "customersPerAgeRange" : [ {
    "ageRange" : "18-25",
    "numberOfCustomers" : 34
  }, {
    "ageRange" : "25-35",
    "numberOfCustomers" : 28
  }, {
    "ageRange" : "35-50",
    "numberOfCustomers" : 15
  } ],
  "numberOfSearchesPerWord" : [ {
    "word" : "Pasta",
    "numberOfSearches" : 51
  }, {
    "word" : "Pizza",
    "numberOfSearches" : 83
  }, {
    "word" : "Spaghetti",
    "numberOfSearches" : 31
  } ],
  "menusWithRatings" : [ {
    "menuName" : "New menu",
    "rating" : 3.4
  }, {
    "menuName" : "Dinner menu",
    "rating" : 4.2
  }, {
    "menuName" : "Menu of the day",
    "rating" : 5
  }, {
    "menuName" : "Launch menu",
    "rating" : 2
  }, {
    "menuName" : "Exotic menu",
    "rating" : 3.9
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
 * Logs consultant into the system
 * Logs consultant into the system. If the login succeeds, returns the json web token.
 *
 * body ConsultantLogin Consultant that needs to login
 * returns Token
 **/
exports.loginConsultant = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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


/**
 * Upload an image
 * This endpoint is used in order to upload EVERY image. For example, when a restaurant owner is registering his restaurant data, he will need to upload an image. Both this endpoint and the dedicated endpoint (POST /api/user/owner/restaurant) will be used. This endpoint to upload the image, the other one to upload all the other textual data (with a json). The images will be stored using Amazon s3. The ID of the image is returned.  For more information, this is used as a reference:  https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices   This endpoint requires authentication: we don't want anyone to update images but only authenticated users.
 *
 * returns ImageID
 **/
exports.uploadImage = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "imageID" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

