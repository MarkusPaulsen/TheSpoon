const AWS_IMAGE_STORAGE = "https://the-spoon.s3.eu-central-1.amazonaws.com/";

const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const Tag = require('../models/tag.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');
const TaggedMenu = require('../models/taggedMenu.js');


const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');
const findRestaurant = require('../middleware/findRestaurantOfOwnerMiddleware.js');


//TODO: When POSTing, PUTing or DELETing a menuItem, update the menus average price.
//TODO: When PUTing you can start with checking if the price has changed. If so, update the averagePrice.
//Add a menuItem to a menu
router.post('/:menuID/menuItem', auth, isOwner, findRestaurant, async (req, res) => {
    console.log('in POST /api/user/owner/restaurant/menu/{menuID}/menuItem');

    try {

        const menuID = req.params.menuID;
        const menuItem = req.body;
        const imageLink = AWS_IMAGE_STORAGE + menuItem.imageID;

        //check if the tags of the menu exist in the database
        for (let tag of menuItem.tags) {
            const tagFound = await Tag.findAll({
                where: {
                    Name: tag
                }
            });
            if (tagFound.length <= 0) return res.status(400).send('One or more tags are not valid.');
        }

        //create the menuItem
        const menuItemCreated = await MenuItem.create({
            Menu_ID: menuID,
            Name: menuItem.name,
            Description: menuItem.description,
            Type: menuItem.type,
            Price: menuItem.priceEuros,
            ImageLink: imageLink
        });

        //for each menuItem created, associate it to the tags it has
        for (let tag of menuItem.tags) {
            await TaggedItem.create({
                MI_ID: menuItemCreated.dataValues.MI_ID,
                Tag: tag
            });
        }

        const menu = await Menu.findOne({
            attributes: ['Name', 'Description'],
            where: {
                Menu_ID: menuID
            }
            ,
            include: [{
                model: TaggedMenu,
                attributes: ['Tag'],
                include: [{
                    model: Tag,
                    as: 'Tags'
                }]
            }
                , {
                    model: MenuItem,
                    attributes: ['Name', 'Description', 'Type', 'Price', 'ImageLink'],
                    include: [{
                        model: TaggedItem,
                        attributes: ['Tag'],
                        include: [{model: Tag, as: 'Tags'}]
                    }]
                }
            ]

        });

        const menuTags = await formatTags(menu.TaggedMenus);
        const menuItems = await formatMenuItems(menu.MenuItems);

        const menuInfo = {
            name: menu.Name,
            description: menu.Description,
            tags: menuTags,
            menuItems: menuItems
        }

        await updatePriceAverage(menuID);
        res.status(200).send(menuInfo);

    }catch (error) {
        res.status(500).send('Internal server error');
    }


});

//Edit a menuItem
router.put('/:menuID/menuItem/:menuItemID', auth, isOwner, findRestaurant, async (req, res) => {
    console.log('In PUT /api/user/owner/restaurant/menu/{menuID}/menuItem/{menuItemID}');
    try {
        const menuID = req.params.menuID;
        const menuItemID = req.params.menuItemID;
        const menuItem = req.body;
        const imageLink = AWS_IMAGE_STORAGE + menuItem.imageID;

        const menuItemFound = await MenuItem.findOne({
            where: {
                MI_ID: menuItemID,
                Menu_ID: menuID
            }
        });

        if(!menuItemFound){
            res.status(404).send('Menu or menu item not found');
        }

        if (!menuItem) {
            res.status(400).send('No such element');
        }

        //update menuItem
        await menuItemFound.update({
            Name: menuItem.name,
            Description: menuItem.description,
            Type: menuItem.type,
            Price: menuItem.priceEuros,
            ImageLink: imageLink
        });

        //update tags - delete previous and set new
        await TaggedItem.destroy({
            where: {
                MI_ID: menuItemID
            }
        });
        for (let tag of menuItem.tags) {
            await TaggedItem.create({
                MI_ID: menuItemID,
                Tag: tag
            });
        }


        const menu = await Menu.findOne({
            attributes: ['Name', 'Description'],
            where: {
                Menu_ID: menuID
            }
            ,
            include: [{
                model: TaggedMenu,
                attributes: ['Tag'],
                include: [{
                    model: Tag,
                    as: 'Tags'
                }]
            }
                , {
                    model: MenuItem,
                    attributes: ['Name', 'Description', 'Type', 'Price', 'ImageLink'],
                    include: [{
                        model: TaggedItem,
                        attributes: ['Tag'],
                        include: [{
                            model: Tag,
                            as: 'Tags'
                        }]
                    }]
                }
            ]

        });

        const menuTags = await formatTags(menu.TaggedMenus);
        const menuItems = await formatMenuItems(menu.MenuItems);

        const menuInfo = {
            name: menu.Name,
            description: menu.Description,
            tags: menuTags,
            menuItems: menuItems
        }
        await updatePriceAverage(menuID);
        res.status(200).send(menuInfo);
    } catch (error) {
        res.status(500).send('Internal server error');
    }


});

//Delete a menuItem
router.delete('/:menuID/menuItem/:menuItemID', auth, isOwner, findRestaurant, async (req, res) => {
    console.log('In DELETE /api/user/owner/restaurant/menu/{menuID}/menuItem/{menuItemID} ');
    try {
        const menuID = req.params.menuID;
        const menuItemID = req.params.menuItemID;

        const menuItemFound = await MenuItem.findOne({
            where: {
                MI_ID: menuItemID,
                Menu_ID: menuID
            }
        });

        if (!menuItemFound) {
            res.status(404).send('Menu or menu item not found');
        }

        await menuItemFound.destroy();
        await updatePriceAverage(menuID);
        res.status(200).send('deleted');

    }catch (error) {
        res.status(500).send('Internal server error');
    }

});

const formatMenuItems = (menuItems) => {
    for (let i = 0; i < menuItems.length; i++) {
        const tags = formatTags(menuItems[i].TaggedItems);
        menuItems[i] = {
            name: menuItems[i].Name,
            description: menuItems[i].Description,
            type: menuItems[i].Description,
            priceEuros: menuItems[i].Price,
            tags: tags,
            imageLink: menuItems[i].ImageLink
        }
    }
    return menuItems;
};

const formatTags = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = {
            name: arr[i].Tags.Name,
            color: arr[i].Tags.Color
        }
    }
    return arr;
};


const updatePriceAverage = async (menuID) => {
    try {
        const menu = await Menu.findOne({
            attributes: ['AveragePrice'],
            where: {
                Menu_ID: menuID
            },
            include: [{
                model: MenuItem
            }]
        });
        let nrMenuItems = parseFloat(menu.MenuItems.length);
        let sum = 0;
        for (let i = 0; i < nrMenuItems; i++) {
            let price = parseFloat(menu.MenuItems[i].Price);
            sum += price;
        }
        let avgPrice = (sum / nrMenuItems).toFixed(0);
        Menu.update({
                AveragePrice: avgPrice
            },
            {
                where: {
                    Menu_ID: menuID
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
};



module.exports = router;