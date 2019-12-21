const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json());


//those are all the routes
const login = require('./routes/login.js');
const registrationCustomer = require('./routes/registrationCustomer.js');
const registrationOwner = require('./routes/registrationOwner.js');
const image = require('./routes/image-upload.js');
const searchByMenuItem = require('./routes/searchByMenuItem.js');
const manageMenuInformation = require('./routes/manageMenuInformation.js');
const searchMenu = require('./routes/searchMenu.js');
const manageRestaurantInformation = require('./routes/manageRestaurantInformation.js');
const manageCustomerReviews = require('./routes/manageCustomerReviews.js');
const manageCustomerInformation = require('./routes/manageCustomerInformation.js');
const createReview = require('./routes/createReview.js');
const getTags = require('./routes/getTags.js');
const pendingReviews = require('./routes/pendingReviews.js');
const ownerProfile = require('./routes/ownerProfile.js');
const registrationConsultant= require('./routes/registrationConsultant.js');
const consultantLogin= require('./routes/consultantLogin.js');


app.use('/api/image', image);
app.use('/api/user/login', login);
app.use('/api/user/owner/tag', getTags);
app.use('/api/user/owner/register', registrationOwner);
app.use('/api/user/owner/restaurant/menu', manageMenuInformation);
app.use('/api/user/owner/restaurant/review', pendingReviews);
app.use('/api/user/owner/restaurant', manageRestaurantInformation);
app.use('/api/user/owner', ownerProfile);
app.use('/api/user/customer/register', registrationCustomer);
app.use('/api/user/customer/menu/searchByMenuItem', searchByMenuItem);
app.use('/api/user/customer/menu', searchMenu);
app.use('/api/user/customer/review/restaurant', createReview);
app.use('/api/user/customer/review', manageCustomerReviews);
app.use('/api/user/customer', manageCustomerInformation);
app.use('/api/consultant/register', registrationConsultant);
app.use('/api/consultant/login', consultantLogin);


app.use(bodyParser.json());


module.exports = app;


