const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const Tag = require('../models/tag.js');
const TaggedMenu = require('../models/taggedMenu.js');
const TaggedItem = require('../models/taggedItem.js');
const MenuItem = require('../models/menuItem.js');
const ItemReview = require('../models/itemReview.js');

const inputValidator = require('../middleware/inputValidationMiddleware.js');
const validationSchema = require('../validationSchemas.js');
const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');

const menuItem = require('./menuItem.js');

//Add an empty menu to a restaurant
router.post('/', auth, inputValidator(validationSchema.addMenuValidation), isOwner, findRestaurant, async (req, res) => {
    //only tags already present in the database, in the table Tag, are allowed to used
    //so first check if the tags of the menu are in the database

    //check if the tags of the menu exist in the database
    for (let tag of req.body.tags) {
        const tagFound = await Tag.findAll({
            where: {
                Name: tag
            }
        });
        if (tagFound.length <= 0) return res.status(400).send('One or more tags are not valid');
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

    //send the response
    res.status(200).send({menuID: menuCreated.dataValues.Menu_ID});
});


router.get('/', auth, isOwner, findRestaurant, async (req, res) => {
    try {
        let menus = await Menu.findAll({
            where: {
                Restaurant_ID: req.restaurant.Restaurant_ID
            },
            include: [{
                model: TaggedMenu,
                attributes: ['Tag'],
                include: [{
                    model: Tag,
                    as: 'Tags'
                }]
            }, {
                model: MenuItem,
                include: [{
                    model: TaggedItem,
                    include: [{
                        model: Tag,
                        as: 'Tags'
                    }]
                },
                {
                    model: ItemReview,
                    attributes: ['Username', 'ItemRating', 'Content']
                }]
            }]
        });
        // Format the response
        menus = await menus.map( async m => {
            let menuTags = formatTags(m.TaggedMenus);
            let items = await m.MenuItems.map( async mi => {
                let itemTags = await formatTags(mi.TaggedItems);
                let itemReviews = await mi.ItemReviews.map( async ir => {
                    return {
                        username: ir.Username,
                        rating: ir.ItemRating,
                        content: ir.Content
                    }
                });
                itemReviews = await Promise.all(itemReviews);
                return {
                    menuItemID: mi.MI_ID,
                    name: mi.Name,
                    description: mi.Description,
                    type: mi.Type,
                    priceEuros: mi.Price,
                    imageLink: mi.ImageLink,
                    tags: itemTags,
                    rating: mi.Rating,
                    menuItemReviews: {
                        rating: mi.Rating,
                        reviews:itemReviews
                    }
                };
            });
            items = await Promise.all(items);
            return {
                menuID: m.Menu_ID,
                name: m.Name,
                description: m.Description,
                tags: menuTags,
                totalScore: m.Rating,
                serviceScore: m.Service,
                qualityOverPriceScore: m.Quality,
                menuItems: items
            }

        });
        menus = await Promise.all(menus);
        res.status(200).send(menus);
    } catch (error) {
        res.status(404).send(error+ ' :(');
    }
});

//Edit a menu's information     (not its items)
router.put('/:menuID', auth, inputValidator(validationSchema.editMenuValidation), isOwner, findRestaurant, async (req,res) => {

    //check if the menu with given menuID exist
    const menuFound = await Menu.findAll({
        where: {
            Menu_ID: req.params.menuID
        }
    });
    if (menuFound.length <= 0) return res.status(404).send('Menu not found');

    //check if the tags of the menu exist in the database
    for (let tag of req.body.tags) {
        const tagFound = await Tag.findAll({
            where: {
                Name: tag
            }
        });
        if (tagFound.length <= 0) return res.status(400).send('One or more tags are not valid');
    }

    //edit the corresponding row in Menu table
    await Menu.update({
        Restaurant_ID: req.restaurant.Restaurant_ID,
        Name: req.body.name,
        Description: req.body.description},
        {
            where: {
                Menu_ID: req.params.menuID
            }
    });

    //remove all the previous associated tags in the database
    await TaggedMenu.destroy({
        where: {
            Menu_ID: req.params.menuID
        }
    });

    //associate the menu to each tag it has
    for (let tag of req.body.tags) {
        await TaggedMenu.create({
            Menu_ID: req.params.menuID,
            Tag: tag
        });
    }

    //send the response
    res.status(200).send({menuID: req.params.menuID});
});


//Delete a menu
router.delete('/:menuID', auth, isOwner, findRestaurant, async (req,res) => {

    //check if the menu with given menuID exist
    const menuFound = await Menu.findAll({
        where: {
            Menu_ID: req.params.menuID
        }
    });
    if (menuFound.length <= 0) return res.status(404).send('Menu not found');

    //there is no need to manually delete the associated tags in the database: deleting the menu will also delete them
    //(on delete cascade)
    //delete the menu
    await Menu.destroy({
        where: {
            Menu_ID: req.params.menuID
        }
    });

    //send the response
    res.status(200).send({menuID: req.params.menuID});
});

//this is required in order to route the request to the endpoints that manage the menu items
router.use('/', menuItem);



const formatTags = (arr) => {
    if (arr.length < 1){
        return null;
    } else {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = {
                name: arr[i].Tags.Name,
                color: arr[i].Tags.Color
            }
        }
        return arr;
    }
};

module.exports = router;