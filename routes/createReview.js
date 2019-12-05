const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware');

const Menu = require('../models/menu.js');
const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');
const MenuItem = require('../models/menuItem.js');

router.post('/menu/:menuID', auth, isCustomer, async (req, res) => {
    console.log('In POST /api/user/customer/review/restaurant/menu/' + req.params.menuID);
    const menuID = req.params.menuID;

    //check if menu with menuID exists
    const menu = await Menu.findOne({
        where: {
            Menu_ID: menuID
        }
    })

    if (!menu) return res.status(404).send('Menu with menuID' + menuID + ' doesn\'t exist')

    //check if menu item with menuItemID exists
    const itemReviews = req.body.menuItemsReviews;
    for (let i = 0; i < itemReviews.length; i++) {
        const menuItemID = itemReviews[i].menuItemID;
        const menuItem = await MenuItem.findOne({
            where: {
                MI_ID: menuItemID
            }
        })
        if (!menuItem) return res.status(404).send('Menu item with MI_ID ' + menuItemID + ' doesn\'t exist')
    }

    //create menu review
    const menuReview = await MenuReview.create({
        Username: req.username,
        Menu_ID: menuID,
        Date: req.body.date,
        ServiceRating: req.body.serviceRating,
        QualityRating: req.body.qualityOverPriceRating,
        Status: 'approved',
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

    res.status(201).send('Sucessful operation');

});
module.exports = router;