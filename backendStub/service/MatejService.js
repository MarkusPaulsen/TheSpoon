'use strict';


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

