
const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');
const TaggedMenu = require('../models/taggedMenu.js');
const Restaurant = require('../models/restaurants.js');
const Tag = require('../models/tag.js');



router.get('/:menuID', async (req, res) => {
    try {

        const menuInfo = await Menu.findOne({
            attributes: ['Name', 'Description', 'Menu_ID', 'Restaurant_ID'],
            where: {
                Menu_ID: req.params.menuID
            }
        });

        //Find coordinates
        const restaurantInfo = await Restaurant.findOne({
            attributes: ['Name', 'Address', 'City', 'Country', 'Latitude', 'Longitude'],
            where: {
                Restaurant_ID: menuInfo.dataValues.Restaurant_ID
            }
        });
        /*
        const menuTags = await TaggedMenu.findAll({
            attributes: ['Tag'],
            where: {
                Menu_ID: req.params.menuID
            }
        });

        /*
        // Retrieve the color of the tag
        const tags = await menuTags.map( async t => {
            const tag = await Tag.findOne({
                attributes: ['Color'],
                where: {
                    Name: t.dataValues.Tag
                }
            });
            /*
            return {
                name: t.dataValues.Name,
                color: tag.dataValues.Color
            }

            return tag
        });
        */

        const menuItemsWithoutTags= await MenuItem.findAll({
            where: {
                Menu_ID: req.params.menuID
            }
        });

        const promises = menuItemsWithoutTags.map(async menuItems => {
            const tagsOnItem = await TaggedItem.findAll({
                attributes: ['Tag'],
                where: {
                    MI_ID: menuItems.dataValues.MI_ID
                }
            });
            const tags = await tagsOnItem.map( m => { return m.dataValues.Tag });

            return {
                name: menuItems.dataValues.Name,
                description: menuItems.dataValues.Description,
                type: menuItems.dataValues.Type,
                priceEuros: menuItems.dataValues.Price,
                imageLink: menuItems.dataValues.ImageLink,
                tags}
        });
        const menuItems = await Promise.all(promises);

        res.status(200).send({
            restaurant: {
                restaurantName: restaurantInfo.dataValues.Name,
                address: restaurantInfo.dataValues.Address,
                city: restaurantInfo.dataValues.City,
                country: restaurantInfo.dataValues.Country,
                latitude: restaurantInfo.dataValues.latitude,
                longitude: restaurantInfo.dataValues.longitude
            },
            menuName: menuInfo.dataValues.Name,
            description:  menuInfo.dataValues.Description,
            menuRating: '',
            //tags,
            menuItems
        });
    } catch (error){
        res.status(400).send(error);
    }
});

module.exports = router;