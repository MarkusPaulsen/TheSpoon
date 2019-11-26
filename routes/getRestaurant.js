const express = require('express');
const router = express();
router.use(express.json());

const Restaurant = require('../models/restaurant');
const OpeningHours = require('../models/openingHours');


const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

router.get('/', auth, isOwner, findRestaurant, async (req, res) => {
    try {
        const restaurant = await Restaurant.findOne ({
            where: {
                Restaurant_ID: req.restaurant.Restaurant_ID
            }
        });
        let openingHours = await OpeningHours.findAll({
            where: {
                Restaurant_ID: req.restaurant.Restaurant_ID
            }
        });
        openingHours = await openingHours.map( i => {
            return {
                day: i.dataValues.Day,
                openTime: i.dataValues.OpenTime,
                closeTime: i.dataValues.CloseTime
            };
        });
        res.status(200).send({
            name: restaurant.dataValues.Name,
            address: restaurant.dataValues.Address,
            city: restaurant.dataValues.City,
            country: restaurant.dataValues.Country,
            imageLink: restaurant.dataValues.ImageLink,
            openingHours: openingHours
        });
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;