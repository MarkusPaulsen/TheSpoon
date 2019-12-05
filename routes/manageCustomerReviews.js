const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware.js');

const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');


// req.username for retrieving customers username.
// Get all  reviews of a customer

//TODO: Should it also return some information about the restaurant??

router.get('/', auth, isCustomer , async (req, res) => {
    try {
        const reviews = await MenuReview.findAll ({
            where: {
                Username: req.username
            },
            include: [{
                model: ItemReview,
                attributes: ['MI_ID', 'ItemRating', 'Content'],
                where: {
                    Username: req.username
                }
            }]
        });

        const formattedReview = await reviews.map( async r => {
            let formattedItemReview = await r.ItemReviews.map( async i => {
                return {
                    menuItemID: i.MI_ID,
                    rating: i.Rating,
                    content: i.Content
                }
            });
            formattedItemReview = await Promise.all(formattedItemReview);
            return {
                menuID: r.Menu_ID,
                serviceRating: r.ServiceRating,
                qualityOverPriceRating: r.QualityRating,
                receiptImageID: r.Image_ID,
                status: r.Status,
                menuItemsReviews: formattedItemReview
            }
        });
        const result = await Promise.all(formattedReview);
        res.status(200).send(result);
    } catch (error){
        res.status(400).send(error + ' :(');
    }
});

//TODO: Just possible to delete the whole menuReview including the itemReviews or possibility to delete specific itemReviews as well?

// Delete a specific menuReview of a customer, with all its associated itemReviews
router.delete('/:reviewID', auth, isCustomer, async (req, res) => {

    //check if the review with given reviewID exist
    const reviewFound = await MenuReview.findOne({
        where: {
            MenuReview_ID: req.params.reviewID
        }
    });
    // If no review is found, return 404 Not found.
    if (reviewFound.length <= 0) return res.status(404).send('Menu not found');

    // Delete review from system.
    await MenuReview.destroy({
        where: {
            MenuReview_ID: req.params.reviewID
        }
    });
    //send the response
    res.status(200).send({reviewID: req.params.reviewID});

});

module.exports = router;