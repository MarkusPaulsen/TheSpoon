const express = require('express');
const router = express();
router.use(express.json());


const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const Restaurant = require('../models/restaurants.js');
const TaggedMenu = require('../models/taggedMenu.js');
const Tag = require('../models/tag.js');
const Customer = require('../models/customer.js');
const Search = require('../models/search.js');


const jwt = require('jsonwebtoken');
const config = require('config');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        let username = null;
        if (token) {
            username = jwt.verify(token, config.get('jwtPrivateKey')).username;
        }
        const searchWord = req.query.menuItemName;
        let matchingItems;
        matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Name: {[Op.iLike]: '%'+ searchWord+ '%'}
            }
        });
        if (matchingItems.length < 1) {
            return res.status(404).send('No matching menus.');
        }
        matchingItems = await pruneByMenuID(matchingItems);

        let promises = await matchingItems.map(async mi => {
            let menuInfo = await Menu.findOne({
                attributes: ['Name', 'Description', 'Menu_ID', 'Restaurant_ID', 'Rating', 'AveragePrice'],
                where: {
                    Menu_ID: mi.dataValues.Menu_ID
                },
                include: [{
                    model: Restaurant,
                    attributes: ['Name', 'ImageLink', 'Latitude', 'Longitude']
                }, {
                    model: TaggedMenu,
                    attributes: ['Tag'],
                    include: [{
                        model: Tag,
                        as: 'Tags'
                    }]
                }]
            });
            const distance = computeDistance(req.query.Latitude, req.query.Longitude, menuInfo.Restaurant.Latitude, menuInfo.Restaurant.Longitude);
            const tags = await formatTags(menuInfo.TaggedMenus);
            menuInfo = {
                restaurantData: {
                    restaurantName: menuInfo.Restaurant.Name,
                    restaurantImageLink: menuInfo.Restaurant.ImageLink,
                    distance: distance
                },
                menu: {
                    menuID: menuInfo.Menu_ID,
                    name: menuInfo.Name,
                    description: menuInfo.Description,
                    tags: tags,
                    rating: menuInfo.Rating,
                    averagePrice: menuInfo.AveragePrice
                    }
                };
            return menuInfo;
            });
        // Update the statistics
        await storeSearch(username, searchWord);

        const result = await Promise.all(promises);



        res.status(200).send(result);
    } catch (error) {
        res.status(500).send('Internal server error.');
    }
});

const storeSearch = async (username, searchWord) => {
    const searchedFor = await Search.findOne({
        where: {
            [Op.and]: [{SearchedWord: searchWord}, {Username: username}]
        }
    });

    if (searchedFor == null) {
        const search = await Search.create({
            Username: username,
            SearchedWord: searchWord,
            NumberOfSearches: 1
        })
    } else {
        let count = searchedFor.NumberOfSearches + 1;
        const search = await Search.update ({
            NumberOfSearches: count
        },
            {
                where: {
                    [Op.and]: [{SearchedWord: searchWord}, {Username: username}]
                }
            }
        )
    }
};

const formatTags = (arr) => {
    for (let i = 0; i < arr.length; i++){
        arr[i] = {
            name: arr[i].Tags.Name,
            color: arr[i].Tags.Color
        }
    }
    return arr;
};

const pruneByMenuID = (arr) => {
    let d = [];
    for (let i = 0; i < arr.length; i++){
        let id = arr[i].Menu_ID;
        if (d.includes(id)){
            arr.splice(i, 1);
            i --;
        } else {
            d.push(arr[i].Menu_ID);
        }
    }
    return arr

};

// Haversine formula for computing distance between two LatLongs.
const computeDistance = (latCustomer, longCustomer, latRestaurant, longRestaurant) => {
    latCustomer = parseFloat(latCustomer);
    longCustomer = parseFloat(longCustomer);
    latRestaurant = parseFloat(latRestaurant);
    longRestaurant = parseFloat(longRestaurant);
    let r = 6371;
    let dLat = deg2rad(latRestaurant - latCustomer);
    let dLong = deg2rad(longRestaurant - longCustomer);
    let a =
        Math.sin(dLat/2)*Math.sin(dLat/2) +
        Math.cos(deg2rad(latCustomer)) * Math.cos(deg2rad(latRestaurant)) * Math.sin(dLong/2)* Math.sin(dLong/2);
    let c = 2* Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = r * c;
    return d;
};

const deg2rad = (deg) => {
    deg = parseFloat(deg);
    return deg * (Math.PI/180)
};

module.exports = router;