
const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');
const TaggedMenu = require('../models/taggedMenu.js');



router.get('/:menuID', async (req, res) => {
    try {

        const menuInfo = await Menu.findOne({
            attributes: ['Name', 'Description', 'Menu_ID'],
            where: {
                Menu_ID: req.params.menuID
            }
        });
        const menuTags = await TaggedMenu.findAll({
            attributes: ['Tag'],
            where: {
                Menu_ID: req.params.menuID
            }
        });
        const menuItemsWithoutTags= await MenuItem.findAll({
            where: {
                Menu_ID: req.params.menuID
            }
        });
        const promises =  menuItemsWithoutTags.map(async menuItems => {
            const tags = await TaggedItem.findAll({
                attributes: ['Tag'],
                where: {
                    MI_ID: menuItems.dataValues.MI_ID
                }
            });
            return {
                name: menuItems.dataValues.Name,
                description: menuItems.dataValues.Description,
                priceEuros: menuItems.dataValues.Price,
                imageLink: menuItems.dataValues.ImageLink,
                tags}
        });
        const menuItems = await Promise.all(promises);

        res.status(200).send({
            name: menuInfo.dataValues.Name,
            description:  menuInfo.dataValues.Description,
            tags: menuTags,
            menuItems
        });
    } catch (error){
        res.status(400).send(error);
    }
});

module.exports = router;