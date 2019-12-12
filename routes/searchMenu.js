
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
    let serviceRating, qualityRating;
    let itemRatings = [];
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
                attributes: ['ServiceRating', 'QualityRating']
            }]
        });
        if (menuInfo === null) {
            return res.send(404).status('Menu not found');
        }
        const menuTags = formatTags(menuInfo.TaggedMenus);
        serviceRating = averageRating(menuInfo.MenuReviews, 'ServiceRating');
        qualityRating = averageRating(menuInfo.MenuReviews, 'QualityRating');
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
                attributes: ['ItemRating']
            }]
        });

        menuItems =  await menuItems.map ( mi => {
            const tags= formatTags(mi.TaggedItems);
            const rating = averageRating(mi.ItemReviews, 'ItemRating');
            if (!(rating === null)) {
                itemRatings.push({ir: rating});
            }
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
        let itemRating = averageRating(itemRatings,'ir');
        const menuRating = computeMenuRating( qualityRating, serviceRating, itemRating, menuItems.length.toFixed(1), itemRatings.length.toFixed(1) );

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

router.get('/:menuID/menuItem/:menuItemID/review', async (req, res) => {
    try{
        let itemReviews = await ItemReview.findAll({
            attributes: ['Username', 'ItemRating', 'Content', 'Date'],
            where: {
                MI_ID: req.params.menuItemID
            }
        });
        itemReviews = await itemReviews.map( async ir => {
            return {
                username: ir.Username,
                rating: ir.ItemRating,
                content: ir.Content,
                Date: ir.Date
            }
        });
        itemReviews = await Promise.all(itemReviews);
        res.status(200).send(itemReviews)
    } catch (error){
        res.status(404).send(error +' :(');
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

const averageRating = (arr, type) => {
    if (arr.length < 1){
        return null;
    } else {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += parseFloat(arr[i][type]);
            }
        return (sum/(arr.length)).toFixed(1);
    }
};

const computeMenuRating = (qualityAverage, serviceAverage, menuItemsAverage, nrMenuRatings, nrMenuItemRatings) => {
    qualityAverage = parseFloat(qualityAverage);
    serviceAverage = parseFloat(serviceAverage);
    menuItemsAverage = parseFloat(menuItemsAverage);
    nrMenuRatings = parseFloat(nrMenuRatings);
    nrMenuItemRatings = parseFloat(nrMenuItemRatings);
    const totalRatings = nrMenuItemRatings + nrMenuRatings;
    const menuRatings = ((qualityAverage + serviceAverage))/(2*nrMenuRatings/totalRatings);
    const itemRatings = menuItemsAverage/(nrMenuItemRatings/totalRatings);
    console.log(menuRatings);
    console.log(itemRatings);
    return  ((menuRatings + itemRatings)/2).toFixed(1);
};
module.exports = router;