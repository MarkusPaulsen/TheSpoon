const express = require('express');
const router = express();
router.use(express.json());

const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const Owner = require('../models/owner.js');
const inputValidator = require('../middleware/inputValidationMiddleware.js');
const validationSchema = require('../validationSchemas.js');

const credentialsAlreadyUsed = require('../utils/credentialsAlreadyUsed.js');

router.post('/', inputValidator(validationSchema.registrationOwnerValidation), async (req, res) => {

    //check if the username of the email are already taken. If that is the case, credentialsAlreadyUsed sends error response
    if(await credentialsAlreadyUsed(req, res)){
        return;
    }

    //the creation of the account starts
    //hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    //create the owner
    try {
        const createdOwner = await Owner.create({
            Username: req.body.username,
            Name: req.body.name,
            Surname: req.body.surname,
            Email: req.body.email,
            Password: hashed
        });
        //send username of created owner as confirmation and the authentication token, so that the owner is already logged in
        const token = jwt.sign({username: req.body.username}, config.get('jwtPrivateKey'), {expiresIn: config.get('jwtExpirationTime')});
        res.status(201).send({username: createdOwner.dataValues.Username, token: token});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
