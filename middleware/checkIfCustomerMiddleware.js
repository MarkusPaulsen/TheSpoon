//NOTE: not tested yet
const Customer = require('../models/customer.js');

module.exports = async (req, res, next) => {
    //check if the username is a customer's username
    const customer = await Customer.findAll({
        where: {
            Username: req.username
        }
    });
    if (customer.length <= 0) return res.status(401).send('Access denied.');
    else next();
};