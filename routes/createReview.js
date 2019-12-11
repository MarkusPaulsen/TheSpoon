const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware');

const Menu = require('../models/menu.js');
const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');
const MenuItem = require('../models/menuItem.js');
const Restaurant = require('../models/restaurants.js');


router.post('/menu/:menuID', auth, isCustomer, async (req, res) => {
    console.log('In POST /api/user/customer/review/restaurant/menu/' + req.params.menuID);
    const menuID = req.params.menuID;

    //check if menu with menuID exists
    const menu = await Menu.findOne({
        where: {
            Menu_ID: menuID
        }
    });

    if (!menu) return res.status(404).send('Menu with menuID' + menuID + ' doesn\'t exist');

    //check if menu item with menuItemID exists
    const itemReviews = req.body.menuItemsReviews;
    for (let i = 0; i < itemReviews.length; i++) {
        const menuItemID = itemReviews[i].menuItemID;
        const menuItem = await MenuItem.findOne({
            where: {
                MI_ID: menuItemID
            }
        });
        if (!menuItem) return res.status(404).send('Menu item with MI_ID ' + menuItemID + ' doesn\'t exist')
    }

    //create menu review
    const menuReview = await MenuReview.create({
        Username: req.username,
        Menu_ID: menuID,
        Date: req.body.date,
        ServiceRating: req.body.serviceRating,
        QualityRating: req.body.qualityOverPriceRating,
        Status: "Pending",
        Image_ID: req.body.receiptImageID
    });

    const menuReviewID = menuReview.dataValues.Review_ID;

    //creating item reviews

    for (let i = 0; i < itemReviews.length; i++) {
        const itemReview = itemReviews[i];
        await ItemReview.create({
            Username: req.username,
            MI_ID: itemReview.menuItemID,
            Content: itemReview.content,
            ItemRating: itemReview.rating,
            Date: req.body.date,
            MenuReview_ID: menuReviewID
        })
    }

    res.status(201).send('Successful operation');

});

//Return all the restaurants
router.get('/', auth, isCustomer, async (req, res) => {

    //find all the restaurants, with their names and IDs
    const restaurantsFound = await Restaurant.findAll({
        attributes: ['Name', 'Restaurant_ID']
    });

    const numberOfRestaurantsFound = restaurantsFound.length;

    //initialize empty response
    let restaurants = [];

    //format the response
    for (let i = 0; i < numberOfRestaurantsFound; i++){
        restaurants[i] = {name: restaurantsFound[i].dataValues.Name, restaurantID: restaurantsFound[i].dataValues.Restaurant_ID}
    }

    res.status(200).send(restaurants);
});

//Return all the menus of given restaurant
router.get('/:restaurantID/menu', auth, isCustomer, async(req, res) => {

    //check if a restaurant with given restaurantID exists
    const restaurantFound = await Restaurant.findAll({
        where: {
            Restaurant_ID: req.params.restaurantID
        }
    });
    if (restaurantFound.length <= 0) return res.status(404).send("Restaurant with given restaurantID doesn't exist");

    //find all the menus of the restaurant with given restaurantID
    const menusFound = await Menu.findAll({
        attributes: ['Name', 'Menu_ID'],
        where: {
            Restaurant_ID: req.params.restaurantID
        }
    });

    //initialize empty response
    let menus = [];

    //format the response
    for (let i = 0; i < menusFound.length; i++){
        menus[i] = {name: menusFound[i].dataValues.Name, menuID: menusFound[i].dataValues.Menu_ID}
    }

    res.status(200).send(menus);
});

//Return all the menu items of given menu
router.get('/menu/:menuID/menuItem', auth, isCustomer, async (req, res) =>{

    //check if a menu with given menuID exists
    const menuFound = await Menu.findAll({
        where: {
            Menu_ID: req.params.menuID
        }
    });
    if (menuFound.length <= 0) return res.status(404).send("Menu with given menuID doesn't exist");

    //find all the menu items of the menu with given menuID
    const menuItemsFound = await MenuItem.findAll({
        attributes: ['Name', 'MI_ID'],
        where: {
            Menu_ID: req.params.menuID
        }
    });

    //initialize empty response
    let menuItems = [];

    //format the response
    for (let i = 0; i < menuItemsFound.length; i++){
        menuItems[i] = {name: menuItemsFound[i].dataValues.Name, menuItemID: menuItemsFound[i].dataValues.MI_ID}
    }

    res.status(200).send(menuItems);

});

module.exports = router;