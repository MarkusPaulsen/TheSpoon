const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const Tag = require('../models/tag.js');
const TaggedMenu = require('../models/taggedMenu.js');
const TaggedItem = require('../models/taggedItem.js');
const MenuItem = require('../models/menuItem.js');

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

//Return all the menus of the restaurant
router.get('/', auth, isOwner, findRestaurant, async (req, res) => {
    try {
        const menus = await Menu.findAll({
            attributes: ['Name', 'Description', 'Menu_ID'],
            where: {
                // Not sure how the parameter is defined. May be restaurantID
                Restaurant_ID: req.restaurant.Restaurant_ID
            }
        });

        //Map through the menus of the restaurant
        const menuWithItems = menus.map( async m => {
            //Find tags associated with the menu.
            let menuTags = await TaggedMenu.findAll({
                attributes: ['Tag'],
                where: {
                    Menu_ID: m.dataValues.Menu_ID
                }
            });

            // Retrieve the color of the tag
            menuTags = await menuTags.map( async t => {
                const tag = await Tag.findOne({
                    where: {
                        Name: t.dataValues.Tag
                    }
                });
                return {
                    name: tag.dataValues.Name,
                    color: tag.dataValues.Color
                }
            });
            const tags = await Promise.all(menuTags);

            //Find items on the menu
            const menuItemsWithoutTags = await MenuItem.findAll({
                where: {
                    Menu_ID: m.dataValues.Menu_ID
                }
            });

            //Map through the items to find the tags connected to the item
            const menuItemsWithTags = menuItemsWithoutTags.map(async mi => {
                let tagsOnItem = await TaggedItem.findAll({
                    attributes: ['Tag'],
                    where: {
                        MI_ID: mi.dataValues.MI_ID
                    }
                });

                tagsOnItem = await tagsOnItem.map( async t => {
                    const tag = await Tag.findOne({
                        where: {
                            Name: t.dataValues.Tag
                        }
                    });
                    return {
                        name: tag.dataValues.Name,
                        color: tag.dataValues.Color
                    }
                });
                const tags = await Promise.all(tagsOnItem);

                //Return the specific menuItem with the right format.
                return {
                    name: mi.dataValues.Name,
                    description: mi.dataValues.Description,
                    type: mi.dataValues.Type,
                    priceEuros: mi.dataValues.Price,
                    imageLink: mi.dataValues.ImageLink,
                    tags
                }
            });

            //Wait for all the find menuItemTags-operation to finish
            const menuItems = await Promise.all(menuItemsWithTags);

            //Return the menu with the right format
            return {
                menuID: m.dataValues.Menu_ID,
                name: m.dataValues.Name,
                description: m.dataValues.Description,
                tags,
                menuItems,
            }

        });

        // Waiting for all the menuItem-operations to be finished
        const result = await Promise.all(menuWithItems);

        //Return the object
        res.status(200).send(result)
    } catch (error){
        res.status(400).send(error);
    }
});


//Edit a menu's information (not its items)
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

module.exports = router;