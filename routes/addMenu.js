const express = require('express');
const router = express();
router.use(express.json());

const Restaurant = require('../models/restaurant.js');

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

router.post('/', auth, isOwner, findRestaurant, async (req, res) => {

});

module.exports = router;