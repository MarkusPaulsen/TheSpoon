const Restaurant = require('../models/restaurant.js');

module.exports = async (req, res, next) => {
    //check if there is a restaurant associated to that restaurant owner and put it into req
    const result = await Restaurant.findAll({
        where: {
            Owner: req.username
        }
    });
    if (result.length <= 0) return res.status(404).send('No restaurant associated to this account found.');
    else {
        req.restaurant = result[0].dataValues;
        next();
    }

};