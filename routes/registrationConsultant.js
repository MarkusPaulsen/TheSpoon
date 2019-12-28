const express = require('express');
const router = express();
router.use(express.json());

const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const Consultant = require('../models/consultant.js');
const inputValidator = require('../middleware/inputValidationMiddleware.js');
const validationSchema = require('../validationSchemas.js');

const credentialsAlreadyUsed = require('../utils/credentialsAlreadyUsed.js');

router.post('/', inputValidator(validationSchema.registrationConsultantValidation), async (req, res) => {
    console.log('In POST /api/consultant/register');
    try {
        if(req.body.companySecret!=config.get('companySecret')){
            res.status(400).send('Wrong company secret word.');
            return;
        }

        //check if the username of the email are already taken. If that is the case, credentialsAlreadyUsed sends error response
        if(await credentialsAlreadyUsed(req, res)){
            return;
        }

        //the creation of the account starts
        //hash the password with a salt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const hashedCompanySecret = await bcrypt.hash(req.body.companySecret, salt);
        //create the consultant
        try {
            const createdConsultant = await Consultant.create({
                Username: req.body.username,
                Password: hashedPassword,
                Name: req.body.name,
                Surname: req.body.surname,
                Email: req.body.email,
                CompanySecret: hashedCompanySecret
            });
            //send username of created consultant as confirmation
            const token = jwt.sign({username: req.body.username}, config.get('jwtPrivateKey'), {expiresIn: config.get('jwtExpirationTime')});
            res.status(201).send({username: createdConsultant.dataValues.Username, token: token});
        } catch (error) {
            res.status(400).send(error);
        }

    }catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
