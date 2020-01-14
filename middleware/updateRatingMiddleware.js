const Menu = require('../models/menu.js');
const MenuItem = require('../models/menuItem.js');
const ItemReview = require('../models/itemReview.js');
const MenuReview = require('../models/menuReview.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Input is:
// List of menuItems that have a new review, or have had a review deleted.
// The menu that is modified.
module.exports = async (menuItems, menu) => {
    try {
        console.log('Inside updateRatingMiddleware.js');
        // Loop through modified items and update the ItemRating-attribute.

        menuItems = await Promise.all(menuItems);

        menuItems = await menuItems.map(async mi => {

            //This should only return ItemReviews with status "Approved"
            const reviews = await ItemReview.findAll({
                attributes: ['ItemRating'],
                where: {
                    [Op.and]: [{MI_ID: mi.menuItemID}, {Status: 'Approved'}]
                }
            });
            let rating = await averageRating(reviews, 'ItemRating');
            //Update Rating-attribute for MenuItem
            await MenuItem.update({
                    Rating: rating
                },
                {
                    where: {
                        MI_ID: mi.menuItemID
                    }
                });
            return reviews;
        });
        //Finished with updating modified Items

        let menuItemRatings = await MenuItem.findAll({
            attributes: ['Rating'],
            where: {
                Menu_ID: menu.Menu_ID
            },
        });

        let mir = [];
        for (let i = 0; i < menuItemRatings.length; i++) {
            if (menuItemRatings[i].dataValues.Rating > 0) {
                await mir.push({Rating: menuItemRatings[i].dataValues.Rating})
            }
        }

        let menuItemsRating = await averageRating(mir, 'Rating');


        // Find the new ratings of the Menu
        // TODO: This should only return approved reviews.
        let menuReviews = await MenuReview.findAll({
            attributes: ['ServiceRating', 'QualityRating'],
            where: {
                [Op.and]: [{Menu_ID: menu.Menu_ID}, {Status: 'Approved'}]
            }
        });

        let serviceRating = averageRating(menuReviews, 'ServiceRating');
        let qualityRating = averageRating(menuReviews, 'QualityRating');
        let menuRating = await computeMenuRating(qualityRating, serviceRating, menuItemsRating, menuReviews.length, menuItems.length);
        console.log('serviceRating: ' + serviceRating);
        console.log('qualityRating: ' + qualityRating);
        console.log('menuRating: ' + menuRating);


        if (isNaN(serviceRating)){
            serviceRating = null
        }
        if (isNaN(qualityRating)){
            qualityRating = null
        }
        if (isNaN(menuRating)){
            menuRating = null
        }

        // Update the menu with the new ratings
        await Menu.update({
                Rating: menuRating,
                Service: serviceRating,
                Quality: qualityRating
            },
            {
                where: {
                    Menu_ID: menu.Menu_ID
                }
            });
        next();
    } catch (error) {
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
        return (sum/(arr.length)).toFixed(2);
    }
};

const computeMenuRating = (qualityAverage, serviceAverage, menuItemsAverage, nrMenuRatings, nrMenuItemRatings) => {
    console.log('menuItemsAverage: ' + menuItemsAverage);
    console.log('nrMenuRatings: ' + nrMenuRatings);
    console.log('nrMenuItemRatings: ' + nrMenuItemRatings);
    qualityAverage = parseFloat(qualityAverage);
    serviceAverage = parseFloat(serviceAverage);
    menuItemsAverage = parseFloat(menuItemsAverage);
    nrMenuRatings = parseFloat(nrMenuRatings);
    nrMenuItemRatings = parseFloat(nrMenuItemRatings);

    const totalRatings = nrMenuItemRatings + nrMenuRatings;
    const alpha = nrMenuRatings/totalRatings;
    const beta = nrMenuItemRatings/totalRatings;
    const SandQAvg = (serviceAverage + qualityAverage)/2;
    return (SandQAvg*alpha + menuItemsAverage*beta).toFixed(2);
};
