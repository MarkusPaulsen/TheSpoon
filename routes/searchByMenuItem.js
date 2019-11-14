
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

        let matchingItems = await MenuItem.findAll({
            attributes: ['Menu_ID'],
            where: {
                Name: {[Op.substring]: req.query.menuItemName}
            } /*,
            include: [{
                //attributes: ['Name', 'Description'],
                model: Menu,
                where: [{
                    Menu_ID: MenuItem.Menu_ID
                }],
                include: [{
                    //attributes: ['Name','Address'],
                    model: Restaurant,
                    where: {
                        Restaurant_ID: Menu.Restaurant_ID
                    }
            }]*/
        });



        /*
        ************* THE FOLLOWING CODE WORKS **************
        let matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Name: {[Op.substring]: req.query.menuItemName}
            }
        });
        ************THE FOLLOWING CODE HAS AN ASYNC PROBLEM ****************
        let menus = await matchingItems.map((mi) => Menu.findAll({
                where: {
                    Menu_ID: mi.Menu_ID
                },
                include: [{
                    attributes: 'Name',
                    model: Restaurant,
                    where: {
                        Restaurant_ID: Restaurant_ID
                    }
                }]
            }));

         */
        res.status(200).send(matchingItems)
    } catch (error){
        res.status(400).send(error);
    }


});

module.exports = router;