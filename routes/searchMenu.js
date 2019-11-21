
const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');
const TaggedMenu = require('../models/taggedMenu.js');
const Restaurant = require('../models/restaurants.js');
const Tag = require('../models/tag.js');

// TODO: Aggregate the rating of the menu
// TODO: Aggregate thte rating of each item

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
        let menuTags = await TaggedMenu.findAll({
            attributes: ['Tag'],
            where: {
                Menu_ID: req.params.menuID
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

        const menuItemsWithoutTags= await MenuItem.findAll({
            where: {
                Menu_ID: req.params.menuID
            }
        });

        const promises = menuItemsWithoutTags.map(async menuItems => {
            let tagsOnItem = await TaggedItem.findAll({
                attributes: ['Tag'],
                where: {
                    MI_ID: menuItems.dataValues.MI_ID
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

            return {
                name: menuItems.dataValues.Name,
                description: menuItems.dataValues.Description,
                type: menuItems.dataValues.Type,
                priceEuros: menuItems.dataValues.Price,
                imageLink: menuItems.dataValues.ImageLink,
                tags
            }
        });
        const menuItems = await Promise.all(promises);

        res.status(200).send({
            restaurant: {
                restaurantName: restaurantInfo.dataValues.Name,
                address: restaurantInfo.dataValues.Address,
                city: restaurantInfo.dataValues.City,
                country: restaurantInfo.dataValues.Country,
                latitude: restaurantInfo.dataValues.Latitude,
                longitude: restaurantInfo.dataValues.Longitude
            },
            menuName: menuInfo.dataValues.Name,
            description:  menuInfo.dataValues.Description,
            menuRating: '',
            tags,
            menuItems
        });
    } catch (error){
        res.status(400).send(error);
    }
});

module.exports = router;