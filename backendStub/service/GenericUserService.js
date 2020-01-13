'use strict';


/**
 * Logs user into the system
 * Logs user into the system. This endpoint is used both for restaurant owner and customer login. In order to distinguish them, in the request json there's the flag ''isRestaurantOwner''.  If the login succeeds, returns the json web token that is supposed to be stored on the frontend application (for example in the local storage of the web browser). Each time the frontend application needs to access an endpoint that requires authentication, that token will be put in the header of the request.
 *
 * body UserLogin User that needs to login
 * returns Token
 **/
exports.loginUser = function(body) {
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

