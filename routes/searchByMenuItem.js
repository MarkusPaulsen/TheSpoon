
const express = require('express');
const router = express();
router.use(express.json());


const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const Restaurant = require('../models/restaurant.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', async (req, res) => {
    try{
        // Find all MenuItems that matches the query-word
        const matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Name: {[Op.substring]: req.query.menuItemName}
            }
        });
        // Find the menus that the matched MenuItems belongs to.
        // There is a problem with the associations between the models
        //
        let promises = matchingItems.map( async mi => {
            await Menu.findAll({
                where: {
                    Menu_ID: mi.dataValues.Menu_ID
                },
                include: [{
                    attributes: 'Name',
                    model: Restaurant,
                    where: {
                        Restaurant_ID: Menu.Restaurant_ID
                    }
                }]
            })
        });

        const menus =  await Promise.all(promises);
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