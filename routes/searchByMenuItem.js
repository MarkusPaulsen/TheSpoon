
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
        /*
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

        const matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Name: {[Op.substring]: req.query.menuItemName}
            }
        });
        let menus = matchingItems.map( async mi => {
            try {
                 await Menu.findAll({
                    where: {
                        Menu_ID: mi.Menu_ID
                    },
                    include: [{
                        attributes: 'Name',
                        model: Restaurant,
                        where: {
                            Restaurant_ID: Menu.Restaurant_ID
                        }
                    }]
                })
            } catch(error){res.status(400).send(error)}
        });
        res.status(200).send(menus)
    } catch (error){
        res.status(400).send(error);
    }


});

module.exports = router;