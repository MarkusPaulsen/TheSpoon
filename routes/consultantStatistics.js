const express = require('express');
const router = express();
router.use(express.json());

const Sequelize = require('sequelize');

const Consultant = require('../models/consultant.js');
const Customer = require('../models/customer.js');
const Owner = require('../models/owner.js');
const Search= require('../models/search.js');
const Menu= require('../models/menu.js');

const isConsultant = require('../middleware/checkIfConsultantMiddleware.js');
const auth = require('../middleware/authorizationMiddleware.js');

//These are needed for checking the the nationality of a customer.
const {getNames} = require('country-list');
nationalities = getNames();



router.get('/', auth, isConsultant, async (req, res) => {
    console.log('In GET /api/consultant/statistics');
    try {
        //get total registered customers
        const totalRegisteredCustomers= await Customer.count();

        //get customers per nationality
        const customersPerNationality=await Customer.findAll({
            attributes: [['Nationality', 'nationality'], [Sequelize.fn('count', Sequelize.col('Nationality')), 'numberOfCustomers']],
            group: ['Nationality']
        });

        //get customers per gender
        const customersPerGender= await Customer.findAll({
            attributes: [['Gender', 'gender'], [Sequelize.fn('count', Sequelize.col('Gender')), 'numberOfCustomers']],
            group: ['Gender']
        });

        //get customers per age range
        const customersPerAgeRange= await Customer.findAll({
            attributes: [['AgeRange', 'ageRange'], [Sequelize.fn('count', Sequelize.col('AgeRange')), 'numberOfCustomers']],
            group: ['AgeRange']
        });

        //get number of searches per word
        const numberOfSearchesPerWord= await Search.findAll({
            attributes: [['SearchedWord', 'word'], [Sequelize.fn('sum', Sequelize.col('NumberOfSearches')), 'numberOfSearches']],
            group: ['SearchedWord']
        });

        //get menus with ratings, skip menus without ratings
        const menusWithRatings= await Menu.findAll({
            attributes: [['Name', 'menuName'], ['Rating', 'rating']],
            where: {
                Rating: {
                    [Sequelize.Op.ne]: null
                }
            }
        });

        const result= {
            totalRegisteredCustomers: totalRegisteredCustomers,
            customersPerNationality: customersPerNationality,
            customersPerGender: customersPerGender,
            customersPerAgeRange: customersPerAgeRange,
            numberOfSearchesPerWord: numberOfSearchesPerWord,
            menusWithRatings: menusWithRatings
        };

        res.status(200).send(result);

    }catch (error) {
        console.log(error)
        res.status(500).send('Internal server error');
    }
});

router.get('/:nationalityName', auth, isConsultant, async (req, res) => {
    console.log('In GET /api/consultant/statistics/' + req.params.nationalityName);
    try{
        const nationality=req.params.nationalityName;

        if(!nationalities.includes(nationality)) res.status(404).send('Nationality not found.');

        //get total registered customers
        const totalRegisteredCustomers= await Customer.count({
            where: {
                Nationality: nationality
            }
        });

        //get customers per gender
        const customersPerGender= await Customer.findAll({
            attributes: [['Gender', 'gender'], [Sequelize.fn('count', Sequelize.col('Gender')), 'numberOfCustomers']],
            group: ['Gender'],
            where: {
                Nationality: nationality
            }
        });

        //get customers per age range
        const customersPerAgeRange= await Customer.findAll({
            attributes: [['AgeRange', 'ageRange'], [Sequelize.fn('count', Sequelize.col('AgeRange')), 'numberOfCustomers']],
            group: ['AgeRange'],
            where: {
                Nationality: nationality
            }
        });

        //get number of searches per word
        const numberOfSearchesPerWord= await Search.findAll({
            attributes: [['SearchedWord', 'word'], [Sequelize.fn('sum', Sequelize.col('NumberOfSearches')), 'numberOfSearches']],
            group: ['SearchedWord'],
            include: [{
                model: Customer,
                attributes: [],
                where: {
                    Nationality: nationality
                }
            }]
        });

        const result= {
            totalRegisteredCustomers: totalRegisteredCustomers,
            customersPerGender: customersPerGender,
            customersPerAgeRange: customersPerAgeRange,
            numberOfSearchesPerWord: numberOfSearchesPerWord
        };

        res.status(200).send(result);

    }catch (error) {
        console.log(error);
        res.status(500).send('Internal server error')
    }
});

module.exports = router;
