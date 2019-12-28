const express = require('express');
const router = express();
router.use(express.json());

const Sequelize = require('sequelize');

const Consultant = require('../models/consultant.js');
const Customer = require('../models/customer.js');
const Owner = require('../models/owner.js');
const Search= require('../models/search.js')

const isConsultant = require('../middleware/checkIfConsultantMiddleware.js');
const auth = require('../middleware/authorizationMiddleware.js');



router.get('/', auth, isConsultant, async (req, res) => {
    console.log('In GET /api/consultant/statistics');
    try {
        console.log('consultant is ' + req.username)

        const customers= await Customer.findAll();
        console.log('customers are ' + JSON.stringify(customers));

        const customersByNationality=await Customer.findAll({
            attributes: ['Nationality', [Sequelize.fn('count', Sequelize.col('Nationality')), 'numberOfCustomers']],
            group: ['Nationality'],
            raw: true
        })

        const customers2=await Customer.count('Nationality', 'count', {
            g
        });
        console.log('customers2 are ' + JSON.stringify(customers2))

        console.log('customers by nationality ' + JSON.stringify(customersByNationality))

        res.status(200).send(customers2);
        // await Search.create({
        //     Username: 'marinco',
        //     SearchedWord: 'word2',
        //     NumberOfSearches: 1
        // });
        // res.status(200).send('ok');


    }catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
