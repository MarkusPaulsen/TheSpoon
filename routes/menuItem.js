const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

//Add a menuItem to a menu
router.post('/:menuID/menuItem/:menuItemID', auth, isOwner, findRestaurant, async (req,res) => {

});

//Edit a menuItem
router.put('/:menuID/menuItem/:menuItemID', auth, isOwner, findRestaurant, async (req,res) => {

});

//Delete a menuItem
router.delete('/:menuID/menuItem/:menuItemID', auth, isOwner, findRestaurant, async (req,res) => {

});

module.exports = router;