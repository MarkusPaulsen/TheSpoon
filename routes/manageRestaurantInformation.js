const express = require('express');
const router = express();
router.use(express.json());

const Restaurant = require('../models/restaurant');
const OpeningHours = require('../models/openingHours');
const openGeocoder = require('node-open-geocoder');

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

//Configure data of the restaurant
router.post('/', auth, isOwner, async (req, res) => {
    const restaurant = await Restaurant.findOne ({
        where: {
            Owner: req.username
        }
    });
    if (restaurant > 0) return res.status(400).send('The owner already has a restaurant.');

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

//Get data of own restaurant
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
        if (restaurant === null){
            res.status(404).send('No restaurant associated to this account found.');
        }
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
        res.status(500).send('Internal server error.');
    }
});

//Edit restaurant's information
router.put('/', auth, isOwner, findRestaurant, async (req, res) => {
    try {
        await openGeocoder()
            .geocode(req.body.address + ', ' + req.body.city)
            .end(async (err, geo) => {
                await Restaurant.update({
                        Owner: req.username,
                        Name: req.body.name,
                        Address: req.body.address,
                        City: req.body.city,
                        Country: req.body.country,
                        Latitude: geo[0].lat,
                        Longitude: geo[0].lon,
                        ImageLink: 'https://the-spoon.s3.eu-central-1.amazonaws.com/'+req.body.imageID},
                    {
                        where: {
                            Restaurant_ID: req.restaurant.Restaurant_ID
                        }
                    });

                //delete old opening hours to recreate them
                await OpeningHours.destroy({
                    where: {
                        Restaurant_ID: req.restaurant.Restaurant_ID
                    }
                });

                //recreate the opening hours
                await req.body.openingHours.map( async o => {
                    await OpeningHours.create({
                        Restaurant_ID: req.restaurant.Restaurant_ID,
                        Day: o.day,
                        OpenTime: o.openTime,
                        CloseTime: o.closeTime
                    });
                });
                res.status(200).send({restaurantID: req.restaurant.Restaurant_ID});
            });
    } catch (error) {
        res.status(500).send('Internal server error.');
    }

});

module.exports = router;