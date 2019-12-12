const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware');

const Restaurant = require('../models/restaurant.js');
const Menu = require('../models/menu.js');
const MenuReview = require('../models/menuReview.js');
const MenuItem = require('../models/menuItem.js');

const PENDING='Pending';
const APPROVED='Approved';
const DISAPPROVED='Disapproved';

router.get('/', auth, isOwner, async (req, res) => {
    console.log('In GET /api/user/owner/restaurant/review')
    const username=req.username;

    const reviews = await MenuReview.findAll({
        where: {
            Status: PENDING
        },
        include: [{
            model: Menu,
            include: [{
                model: Restaurant,
                where: {
                    Owner: username
                }
            },
                {
                    model: MenuItem
                }]
        }]
    })


    //build response
    let response = formatReviews(reviews);

    res.status(200).send(response);

});

router.post('/:reviewID', auth, isOwner, async (req, res) => {
    const username=req.username;
    const reviewID=req.params.reviewID;
    const status=req.body.isApproved? 'Approved' : 'Disapproved';

    //check if the review is regarding to logged in owner's restaurant
    const ownerReviewCheck= await MenuReview.findOne({
        where: {
            Review_ID: reviewID,
            Status: PENDING
        },
        include: [{
            model: Menu,
            include: [{
                model: Restaurant
            }]
        }]
    });

    if(!ownerReviewCheck) res.status(404).send('Review with given reviewID not found');

    const reviewRestaurantOwner=ownerReviewCheck.Menu.Restaurant.Owner;
    if(reviewRestaurantOwner!=username) res.status(403).send('Forbidden request');

    await MenuReview.update({
            Status: status},
        {
            where: {
                Review_ID: reviewID
            }
        });

    //get pending reviews
    const reviews = await MenuReview.findAll({
        where: {
            Status: PENDING
        },
        include: [{
            model: Menu,
            include: [{
                model: Restaurant,
                where: {
                    Owner: username
                }
            },
                {
                    model: MenuItem
                }]
        }]
    })

    //build response
    let response = formatReviews(reviews);

    res.status(201).send(response);
});

const formatReviews = (reviews) => {
    for (let i = 0; i < reviews.length; i++) {

        let reviewID = reviews[i].Review_ID;
        let menuName = reviews[i].Menu.Name;
        let menuItemNames = [];

        for (let j = 0; j < reviews[i].Menu.MenuItems.length; j++) {
            let menuItemName = reviews[i].Menu.MenuItems[j].Name;
            menuItemNames[j] = {
                menuItemName: menuItemName
            }
        }

        reviews[i] = {
            reviewID: reviewID,
            menuName: menuName,
            menuItemNames: menuItemNames
        };

    }
    return reviews;
};

module.exports = router;