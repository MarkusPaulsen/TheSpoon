
const express = require('express');
const router = express();
router.use(express.json());

const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const TaggedItem = require('../models/taggedItem.js');
const TaggedMenu = require('../models/taggedMenu.js');
const Restaurant = require('../models/restaurants.js');
const Tag = require('../models/tag.js');
const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');


router.get('/:menuID', async (req, res) => {
    try {
        let menuInfo = await Menu.findOne({
            attributes: ['Name', 'Description', 'Menu_ID', 'Restaurant_ID'],
            where: {
                Menu_ID: req.params.menuID
            },
            include: [{
                model: Restaurant,
            }, {
                model: TaggedMenu,
                attributes: ['Tag'],
                include: [{
                    model: Tag,
                    as: 'Tags'
                }]
            },{
                model: MenuReview,
                attributes: ['Rating']
            }]
        });

        const menuTags = formatTags(menuInfo.TaggedMenus);
        const menuRating = aggregateRating(menuInfo.MenuReviews);

        let menuItems = await MenuItem.findAll({
            where: {
                Menu_ID: menuInfo.Menu_ID
            },
            include: [{
                model: TaggedItem,
                attributes: ['Tag'],
                include: [{
                    model: Tag,
                    as: 'Tags'
                }]
            }, {
                model: ItemReview,
                attributes: ['Rating']
            }]
        });

        menuItems =  await menuItems.map ( mi => {
            const tags= formatTags(mi.TaggedItems);
            const rating = aggregateRating(mi.ItemReviews);
            return {
                menuItemID: mi.MI_ID,
                name: mi.Name,
                description: mi.Description,
                type: mi.Type,
                priceEuros: mi.Price,
                itemRating: rating,
                imageLink: mi.ImageLink,
                tags: tags
            }
        });

        // TODO: Right format for response
        const result = {
            restaurant: {
                restaurantName: menuInfo.Restaurant.Name,
                address: menuInfo.Restaurant.Address,
                city: menuInfo.Restaurant.City,
                country: menuInfo.Restaurant.Country,
                latitude: menuInfo.Restaurant.Latitude,
                longitude: menuInfo.Restaurant.Longitude
            },
            menuName: menuInfo.Name,
            description: menuInfo.Description,
            tags: menuTags,
            menuRating: menuRating,
            menuItems,
        };

        res.status(200).send(result);
    } catch (error){
        res.status(404).send(error + ' :(');
    }
});




const formatTags = (arr) => {
    if (arr.length < 1){
        return null;
    } else {
        for (let i = 0; i < arr.length; i++) {
            arr[i] = {
                name: arr[i].Tags.Name,
                color: arr[i].Tags.Color
            }
        }
        return arr;
    }
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