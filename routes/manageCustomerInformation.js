const express = require('express');
const router = express();
router.use(express.json());

const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware.js');

const Customer=require('../models/customer.js');

router.get('/', auth, isCustomer, async (req, res) => {
    console.log('In GET /api/user/customer');

    const customer = await Customer.findOne({
        where: {
            Username: req.username
        }
    });

    const customerInfo = {
        username: customer.Username,
        email: customer.Email
    };

    res.status(200).send(customerInfo);

});


module.exports = router;