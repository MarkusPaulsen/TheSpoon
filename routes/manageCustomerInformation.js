const express = require('express');
const router = express();
router.use(express.json());

const bcrypt = require('bcrypt');


const auth = require('../middleware/authorizationMiddleware.js');
const isCustomer = require('../middleware/checkIfCustomerMiddleware.js');

const Customer = require('../models/customer.js');

//These are needed for checking the the nationality of a customer.
const {getNames,  getCode} = require('country-list');
nationalities = getNames();


router.get('/', auth, isCustomer, async (req, res) => {
    console.log('In GET /api/user/customer');
    const username = req.username;

    try {
        const customer = await Customer.findOne({
            where: {
                Username: username
            }
        });
        let nationalityCode = getCode(customer.Nationality);

        if (nationalityCode === undefined) {
            nationalityCode = "";
        }
        console.log(typeof nationalityCode);
        nationalityCode = nationalityCode.toString();
        console.log(typeof nationalityCode);
        const customerInfo = {
            username: customer.Username,
            email: customer.Email,
            gender: customer.Gender,
            ageRange: customer.AgeRange,
            nationality: nationalityCode
        };
        res.status(200).send(customerInfo);

    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

router.put('/', auth, isCustomer, async (req, res) => {
    try {
        //check if the email is already taken (it must be unique)
        const customer = await Customer.findAll({
            where: {
                Email: req.body.email
            }
        });
        // Check if there is another customer with the email.
        if (customer.length > 0 && !(customer[0].dataValues.Email === req.body.email)) return res.status(400).send('Email already taken.');

        // Check if the gender is valid.
        if (!(genders.includes(req.body.gender))) return res.status(400).send('Invalid gender.');

        // Check if the ageRange is valid.
        if (!(ageRanges.includes(req.body.ageRange))) return res.status(400).send('Invalid ageRange.');

        // Check if the nationality is valid.
        let found = false;
        let nationalityName = "";
        let nationalityCode = "";
        for (let i = 0; i < nationalities.length; i++) {
            if (nationalities[i] === req.body.nationality) {
                found = true;
                nationalityName = req.body.nationality;
                nationalityCode = getCode(nationalityName);
                break;
            } else if ( req.body.nationality === "") {
                found= true;
                break;
            }

        }
        if (!found) return res.status(400).send('Invalid nationality.');

        //update the profile of the customer
        await Customer.update({
                Email: req.body.email,
                Gender: req.body.gender,
                AgeRange: req.body.ageRange,
                Nationality: req.body.nationality
            },
            {
                where: {
                    Username: req.username
                }
            });

        //get the updated customer data to send it back as a response
        const customerModified = await Customer.findAll({
            where: {
                Username: req.username
            }
        });

        res.status(200).send({
            email: customerModified[0].dataValues.Email,
            gender: customerModified[0].dataValues.Gender,
            ageRange: customerModified[0].dataValues.AgeRange,
            nationality: {
                nationalityName,
                nationalityCode
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});

//Delete profile of the customer
router.delete('/', auth, isCustomer, async (req, res) => {
    try {

        await Customer.destroy({
            where: {
                Username: req.username
            }
        });
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});

//Change password of the customer
router.put('/password', auth, isCustomer, async (req, res) => {
    try {
        //check if the old password sent is correct
        const oldPassword = await Customer.findOne({
            attributes: ['Password'],
            where: {
                Username: req.username
            }
        });

        const isValid = await bcrypt.compare(req.body.oldPassword, oldPassword.Password);
        if (!isValid) return res.status(400).send("Old password doesn't match.");

        //since the old password matches, it can be changed now
        //hash the new password with a salt
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.newPassword, salt);
        //update the password in the database
        await Customer.update({
                Password: hashed,
            },
            {
                where: {
                    Username: req.username
                }
            });

        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});


// Valid inputs for ageRange and Gender
ageRanges = ["< 18", "18-24", "24-34", "35-49", "50-64", "65+", ""];
genders = ['Male', 'Female', 'Other', ''];

module.exports = router;