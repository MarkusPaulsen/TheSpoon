const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const Tag = require('../models/tag.js');
const TaggedMenu = require('../models/taggedMenu.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

const menuItem = require('./menuItem.js');

//Add an empty menu to a restaurant
router.post('/', auth, isOwner, findRestaurant, async (req, res) => {
    //only tags already present in the database, in the table Tag, are allowed to used
    //so first check if the tags of the menu and the tags of the menuItems are in the database

    //check if the tags of the menu exist in the database
    for (let tag of req.body.tags) {
        const tagFound = await Tag.findAll({
            where: {
                Name: tag
            }
        });
        if (tagFound.length <= 0) return res.status(400).send('One or more tags are not valid');
    }

    //check if the tags of every menuItem exist in the database
    for (let menuItem of req.body.menuItems) {
        for (let tag of menuItem.tags) {
            const tagFound = await Tag.findAll({
                where: {
                    Name: tag
                }
            });
            if (tagFound.length <= 0) return res.status(400).send('One or more tags are not valid');
        }
    }

    //create the menu
    const menuCreated = await Menu.create({
        Restaurant_ID: req.restaurant.Restaurant_ID,
        Name: req.body.name,
        Description: req.body.description
    });

    //associate the menu to each tag it has
    for (let tag of req.body.tags) {
        await TaggedMenu.create({
            Menu_ID: menuCreated.dataValues.Menu_ID,
            Tag: tag
        });
    }

    //create the menuItems
    for (let menuItem of req.body.menuItems) {
        const menuItemCreated = await MenuItem.create({
            Menu_ID: menuCreated.dataValues.Menu_ID,
            Name: menuItem.name,
            Description: menuItem.description,
            Price: menuItem.priceEuros,
            ImageLink: menuItem.imageLink
        });

        //for each menuItem created, associate it to the tags it has
        for (let tag of menuItem.tags) {
            await TaggedItem.create({
                MI_ID: menuItemCreated.dataValues.MI_ID,
                Tag: tag
            });
        }
    }

    //send the response
    res.status(200).send({menuID: menuCreated.dataValues.Menu_ID});
});

//Return all the menus of the restaurant
router.get('/', auth, isOwner, findRestaurant, async (req, res) => {

});

//Edit a menu's information (not its items)
router.put('/:menuID', auth, isOwner, findRestaurant, async (req,res) => {

});

//Delete a menu
router.delete('/:menuID', auth, isOwner, findRestaurant, async (req,res) => {

});

//this is required in order to route the request to the endpoints that manage the menu items
router.use('/', menuItem);

module.exports = router;