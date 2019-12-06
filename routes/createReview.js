const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware');

const Menu=require('../models/menu.js');
const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');

router.post('/menu/:menuID', auth, isCustomer , async (req, res) => {
    const menuID=req.params.menuID;

    const menu=await Menu.findOne({
        where: {
            Menu_ID: menuID
        }
    });

    if(!menu) return res.status(404).send('Menu with given menuID doesn\'t exist')

    //create menu review
     const menuReview= await MenuReview.create({ //SequelizeDatabaseError: null value in column "Review_ID" violates not-null constraint
        Username: req.username,
        Menu_ID: menuID,
        Date: req.body.date,
        ServiceRating: req.body.serviceRating,
        QualityRating: req.body.qualityOverPriceRating,
        Status: "Pending",
        Image_ID: req.body.receiptImageID
    });

    const menuReviewID=menuReview.dataValues.Review_ID;

    //creating item reviews
    const itemReviews=req.body.menuItemsReviews;
    for(let i=0;i< itemReviews.length;i++){
        const itemReview=itemReviews[i];
        ItemReview.create({
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
module.exports = router;