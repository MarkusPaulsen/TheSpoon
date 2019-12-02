const express = require('express');
const router = express();
router.use(express.json());

const Restaurant = require('../models/restaurant');
const OpeningHours = require('../models/openingHours');
const openGeocoder = require('node-open-geocoder');

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

router.post('/', auth, async (req, res) => {
    const latlong = await openGeocoder()
        .geocode(req.body.address + ', ' + req.body.city)
        .end(async (err, geo) => {
            const restaurantCreated = await Restaurant.create({
                Owner: req.username,
                Name: req.body.name,
                Address: req.body.address,
                City: req.body.city,
                Country: req.body.country,
                Latitude: geo[0].lat,
                Longitude: geo[0].lon,
                ImageLink: 'https://the-spoon.s3.eu-central-1.amazonaws.com/'+req.body.imageID
            });

            const openingHours = await req.body.openingHours.map( async o => {
                const openingHourCreated = await OpeningHours.create({
                    Restaurant_ID: restaurantCreated.dataValues.Restaurant_ID,
                    Day: o.day,
                    OpenTime: o.openTime,
                    CloseTime: o.closeTime
                });
            });
            res.status(200).send({restaurantID: restaurantCreated.dataValues.Restaurant_ID});
        });
});

router.get('/', auth, isOwner, findRestaurant, async (req, res) => {
    try {
        let restaurant = await Restaurant.findOne({
            where: {
                Restaurant_ID: req.restaurant.Restaurant_ID
            },
            include: [{
                model: OpeningHours
            }]
        });
        let openingHours = await restaurant.OpeningHours.map( o => {
            return {
                day: o.Day,
                openTime: o.OpenTime,
                closeTime: o.CloseTime
            };
        });
        restaurant = {
            name: restaurant.Name,
            address: restaurant.Address,
            city: restaurant.City,
            country: restaurant.Country,
            imageLink: restaurant.ImageLink,
            openingHours: openingHours
        };
        res.status(200).send(restaurant);
    } catch (error) {
        res.status(400).send(error+ ' :(');
    }
});

module.exports = router;