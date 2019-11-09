const express = require('express');
const router = express();
router.use(express.json());

const Joi = require('joi');
const bcrypt = require('bcrypt');

const Owner = require('../models/owner.js');
const credentialsAlreadyUsed = require('../utils/credentialsAlreadyUsed.js');

router.post('/', async (req, res) => {


    const schema = Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5),
        name: Joi.string().regex(/^[a-zA-Z]/).required(),
        surname: Joi.string().regex(/^[a-zA-Z]/).required(),
        email: Joi.string().trim().email({minDomainAtoms: 2}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required()
    }); 



    const result = Joi.validate(req.body, schema);
    //If the req.body doesn't match the schema, send error message
    if (result.error) {
        res.status(400).send('Invalid input');
        return;
    }

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
        //send username of created owner as confirmation
        res.status(201).send({username: createdOwner.dataValues.Username});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
