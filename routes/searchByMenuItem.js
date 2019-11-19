const express = require('express');
const router = express();
router.use(express.json());


const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const Restaurant = require('../models/restaurants.js');
const TaggedMenu = require('../models/taggedMenu.js');


const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.get('/', async (req, res) => {
    try {
        // Find all MenuItems that matches the query-word
        let matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Name: {[Op.substring]: req.query.menuItemName}
            }
        });
        matchingItems = pruneByMenuID(matchingItems);

        // Find the menus that the matched MenuItems belongs to.
        // There is a problem with the associations between the models. Need to separate the queries for now.
        // Will fix this later on. The actually code can be found at the end of this file.
        let promises =  matchingItems.map(async mi => {
             const menuInfo = await Menu.findOne({
                attributes: ['Name', 'Description', 'Menu_ID', 'Restaurant_ID'],
                where: {
                    Menu_ID: mi.dataValues.Menu_ID
                }
            });
            const restaurantData = await Restaurant.findOne({
                attributes: ['Name'],
                where: {
                    Restaurant_ID: menuInfo.Restaurant_ID
                }
            });
             const tagsOnMenu = await TaggedMenu.findAll ({
                 attributes: ['Tag'],
                 where: {
                     Menu_ID: mi.dataValues.Menu_ID
                 }
             });
             const tags = await tagsOnMenu.map( m => { return m.dataValues.Tag });

             const menu = {
                 menuID: mi.dataValues.Menu_ID,
                 name: menuInfo.dataValues.Name,
                 description: menuInfo.dataValues.Description,
                 tags
             };
             return {
                 restaurantData: {
                     restaurantID: menuInfo.dataValues.Restaurant_ID,
                     restaurantName: restaurantData.dataValues.Name,
                 },
                 menu}
        });

        let result = await Promise.all(promises);
        //let i = " " + matchingItems[1].Menu_ID;
        res.status(200).send(result);

    } catch (error){
        res.status(400).send(error);
    }
});


const pruneByMenuID = (arr) => {
    let d = [];
    for (let i = 0; i < arr.length; i++){
        let id = arr[i].Menu_ID;
        if (d.includes(id)){
            arr.splice(i, 1);
            i --;
        } else {
            d.push(arr[i].Menu_ID);
        }
    }
    return arr

}

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