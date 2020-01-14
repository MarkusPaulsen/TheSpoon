const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware.js');
const updateRating = require('../middleware/updateRatingMiddleware.js');

const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');
const Menu = require('../models/menu.js');
const Restaurant = require('../models/restaurants.js');
const MenuItem = require('../models/menuItem.js');


// Get all  reviews of a customer
router.get('/', auth, isCustomer , async (req, res) => {
    try {
        const reviews = await MenuReview.findAll ({
            where: {
                Username: req.username
            },
            include: [{
                model: ItemReview,
                attributes: ['MI_ID', 'ItemRating', 'Content', 'Date'],
                where: {
                    Username: req.username
                },
                include: [{
                    model: MenuItem,
                    attributes: ['Name']
                }]
            },{
                model: Menu,
                attributes: ['Name'],
                include: [
                    {
                        model: Restaurant,
                        attributes: ['Name']
                }]
            }]
        });

        let formattedReview = await reviews.map( async r => {
            let formattedItemReview = await r.ItemReviews.map( async i => {
                return {
                    menuItemID: i.MI_ID,
                    menuItemName: i.MenuItem.Name,
                    rating: i.ItemRating,
                    content: i.Content,
                }
            });
            formattedItemReview = await Promise.all(formattedItemReview);
            return {
                menuReviewID: r.Review_ID,
                restaurantName: r.Menu.Restaurant.Name,
                menuID: r.Menu_ID,
                menuName: r.Menu.Name,
                serviceRating: r.ServiceRating,
                qualityOverPriceRating: r.QualityRating,
                date: r.Date,
                receiptImageID: r.Image_ID,
                status: r.Status,
                menuItemsReviews: formattedItemReview
            }
        });
        formattedReview = await Promise.all(formattedReview);
        res.status(200).send(formattedReview);
    } catch (error){
        res.status(500).send('Internal server error.');
    }
});


// Delete a specific menuReview of a customer, with all its associated itemReviews
router.delete('/:reviewID', auth, isCustomer, async (req, res) => {
    try {
        const reviewFound = await MenuReview.findOne({
            where: {
                Review_ID: req.params.reviewID
            },
            include: [{
                model: ItemReview,
                attributes: ['MI_ID']
            }]
        });
        // If no review is found, return 404 Not found.
        if (reviewFound === null) {
            return res.status(404).send('Review not found.');
        }

        // Delete review from system.
        if (reviewFound.Username === req.username) {
            await MenuReview.destroy({
                where: {
                    Review_ID: req.params.reviewID
                }
            });
            const itemReviews = await reviewFound.ItemReviews.map(async r => {
                console.log(r.MI_ID);
                return {menuItemID: r.MI_ID}
            });

            //Update rating of Menu and MenuItems that are affected of this deletion.
            await updateRating(itemReviews, reviewFound);

            res.status(200).send({reviewID: req.params.reviewID});
        } else {
            res.status(403).send('Forbidden request.');
        }
    } catch (error){
        res.status(500).send('Internal server error.');
    }

});

module.exports = router;