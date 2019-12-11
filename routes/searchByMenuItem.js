const express = require('express');
const router = express();
router.use(express.json());


const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const Restaurant = require('../models/restaurants.js');
const TaggedMenu = require('../models/taggedMenu.js');
const Tag = require('../models/tag.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.get('/', async (req, res) => {
    let searchWord = req.query.menuItemName;
    console.log('searchWord: ' + searchWord);
    searchWord = searchWord.toString();
    let matchingItems;
    try {
        matchingItems = await MenuItem.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Name: {[Op.substring]: searchWord}
            }
        });
        matchingItems = await pruneByMenuID(matchingItems);

        let promises = await matchingItems.map(async mi => {
            let menuInfo = await Menu.findOne({
                attributes: ['Name', 'Description', 'Menu_ID', 'Restaurant_ID', 'Rating'],
                where: {
                    Menu_ID: mi.dataValues.Menu_ID
                },
                include: [{
                    model: Restaurant,
                    attributes: ['Name', 'ImageLink']
                }, {
                    model: TaggedMenu,
                    attributes: ['Tag'],
                    include: [{
                        model: Tag,
                        as: 'Tags'
                    }]
                }]
            });
            const tags = await formatTags(menuInfo.TaggedMenus);
            menuInfo = {
                restaurantData: {
                    restaurantName: menuInfo.Restaurant.Name,
                    restaurantImageLink: menuInfo.Restaurant.ImageLink
                },
                menu: {
                    menuID: menuInfo.Menu_ID,
                    name: menuInfo.Name,
                    description: menuInfo.Description,
                    tags: tags,
                    rating: menuInfo.Rating
                    }
                };
            return menuInfo;
            });

        const result = await Promise.all(promises);

        res.status(200).send(result);
    } catch (error) {
        res.status(404).send(error + ' :(    , searchWord: ' + searchWord);
    }
});

const formatTags = (arr) => {
    for (let i = 0; i < arr.length; i++){
        arr[i] = {
            name: arr[i].Tags.Name,
            color: arr[i].Tags.Color
        }
    }
    return arr;
};

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

};

const aggregateRating = (arr) => {
    if (arr.length < 1){
        return null;
    } else {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += parseInt(arr[i].Rating);
        }
        return (sum/ (arr.length)).toFixed(1);
    }
};


module.exports = router;

