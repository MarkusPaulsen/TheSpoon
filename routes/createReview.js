const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware');
const updateRating = require('../middleware/updateRatingMiddleware.js');

const Menu = require('../models/menu.js');
const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');
const MenuItem = require('../models/menuItem.js');
const Restaurant = require('../models/restaurants.js');

const PENDING='Pending';


router.post('/menu/:menuID', auth, isCustomer, async (req, res) => {
    console.log('In POST /api/user/customer/review/restaurant/menu/' + req.params.menuID);
    try {
        const menuID = req.params.menuID;

        //check if menu with menuID exists
        const menu = await Menu.findOne({
            where: {
                Menu_ID: menuID
            }
        });

        if (!menu) return res.status(404).send('Menu with menuID ' + menuID + ' doesn\'t exist');

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
            Status: PENDING,
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
    }catch (error) {
        res.status(500).send('Internal server error');
    }
});

//Return all the restaurants
router.get('/', auth, isCustomer, async (req, res) => {

    try {
        //find all the restaurants, with their names and IDs
        let restaurantsFound = await Restaurant.findAll({
            attributes: ['Name', 'Restaurant_ID']
        });

        //initialize empty response
        let restaurants = [];

        const numberOfRestaurantsFound = restaurantsFound.length;

        //filter restaurants that don't have any menu and format the response
        for (let i=0, j=0; i < numberOfRestaurantsFound; i++){
            const hasMenusWithItems = await hasMenusWithMenuItems(restaurantsFound[i]);
            if (hasMenusWithItems) {
                restaurants[j] = {name: restaurantsFound[i].dataValues.Name, restaurantID: restaurantsFound[i].dataValues.Restaurant_ID};
                j++;
            }
        }
        res.status(200).send(restaurants);
    } catch (error) {
        res.status(500).send('Internal server error.');
    }

});

//Return all the menus of given restaurant
router.get('/:restaurantID/menu', auth, isCustomer, async(req, res) => {

    try {
        //check if a restaurant with given restaurantID exists
        const restaurantFound = await Restaurant.findAll({
            where: {
                Restaurant_ID: req.params.restaurantID
            }
        });
        if (restaurantFound.length <= 0) return res.status(404).send("Restaurant with given restaurantID not found.");

        //find all the menus of the restaurant with given restaurantID
        const menusFound = await Menu.findAll({
            attributes: ['Name', 'Menu_ID'],
            where: {
                Restaurant_ID: req.params.restaurantID
            }
        });

        //initialize empty response
        let menus = [];

        //filter menus that don't have any menu item and format the response
        const numberOfMenusFound = menusFound.length;
        for (let i=0, j=0; i < numberOfMenusFound; i++){
            const hasItems = await hasMenuItems(menusFound[i]);
            if (hasItems) {
                menus[j] = {name: menusFound[i].dataValues.Name, menuID: menusFound[i].dataValues.Menu_ID};
                j++;
            }
        }
        res.status(200).send(menus);
    } catch (error) {
        res.status(500).send('Internal server error.');
    }

});

//Return all the menu items of given menu
router.get('/menu/:menuID/menuItem', auth, isCustomer, async (req, res) =>{

    try {
        //check if a menu with given menuID exists
        const menuFound = await Menu.findAll({
            where: {
                Menu_ID: req.params.menuID
            }
        });
        if (menuFound.length <= 0) return res.status(404).send("Menu with given menuID not found.");

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
    } catch (error) {
        res.status(500).send('Internal server error.');
    }


});

//check if a restaurant returned from a query has menus with menu items. Return true if that is the case, false otherwise
async function hasMenusWithMenuItems(restaurantReturnedFromQuery){
    //find all the menus of the restaurant with given restaurantID
    const menusFound = await Menu.findAll({
        where: {
            Restaurant_ID: restaurantReturnedFromQuery.dataValues.Restaurant_ID
        }
    });

    const numberOfMenusFound = menusFound.length;
    let menusFiltered = [];
    for (let i=0, j=0; i < numberOfMenusFound; i++){
        const hasItems = await hasMenuItems(menusFound[i]);
        if (hasItems) {
            menusFiltered[j] = menusFound[i];
            j++;
        }
    }

    return menusFiltered.length > 0;
}
//check if a menu returned from a query has menu items. Return true if that is the case, false otherwise
async function hasMenuItems(menuReturnedFromQuery){
    //find all the menu items of the menu with given menuID
    const menuItemsFound = await MenuItem.findAll({
        where: {
            Menu_ID: menuReturnedFromQuery.dataValues.Menu_ID
        }
    });
    return menuItemsFound.length > 0;
}

module.exports = router;