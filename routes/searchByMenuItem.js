const express = require('express');
const router = express();
router.use(express.json());


const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const Restaurant = require('../models/restaurants.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.get('/', async (req, res) => {
    try{
        // Find all MenuItems that matches the query-word
        let matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Name: {[Op.substring]: req.query.menuItemName}
            }
        });
        // Find the menus that the matched MenuItems belongs to.
        // There is a problem with the associations between the models. Need to separate the queries for now.
        // Will fix this later on. The actually code can be found at the end of this file.
        let promises =  matchingItems.map(async mi => {
             const menu = await Menu.findOne({
                attributes: ['Name', 'Description', 'Menu_ID', 'Restaurant_ID'],
                where: {
                    Menu_ID: mi.dataValues.Menu_ID
                }
            });
             return menu
        });
        let menus = await Promise.all(promises);
    /*

        let np =  await menus.map(async m => {
            const result = await Restaurant.findOne({
                attributes: 'Name',
                where: {
                    Restaurant_ID: m.Restaurant_ID
                }
            });
            return {m, result}
        });

        let results = await Promise.all(np);
        */

        res.status(200).send(menus);

    } catch (error){
        res.status(400).send(error);
    }
});

module.exports = router;


/*
// This is the ideal way to do it. When the associations work, this should work.
let matchingItems = await MenuItem.findAll({
    attributes: ['Menu_ID'],
    where: {
        Name: {[Op.substring]: req.query.menuItemName}
    } ,
    include: [{
        attributes: ['Name', 'Description'],
        model: Menu,
        where: [{
            Menu_ID: MenuItem.Menu_ID
        }],
        include: [{
            attributes: ['Name','Address'],
            model: Restaurant,
            where: {
                Restaurant_ID: Menu.Restaurant_ID
            }
        }]
    }]
});

*/