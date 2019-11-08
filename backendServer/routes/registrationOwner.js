const express = require('express');
const router = express();
router.use(express.json());

const Joi = require('joi');
const bcrypt = require('bcrypt');

const Owner = require('../models/owner.js');

router.post('/', async (req, res) => {


    const schema = Joi.object().keys({
        email: Joi.string().trim().email({minDomainAtoms: 2}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
        name: Joi.string().regex(/^[a-zA-Z]/).required(),
        surname: Joi.string().regex(/^[a-zA-Z]/).required()

    }); 



    const result = Joi.validate(req.body, schema);
    //If the req.body doesn't match the schema, send error message
    if (result.error) {
        res.status(400).send('Invalid input');
        return;
    }

    //check if the the email is already taken (it must be unique, it's the primary key)
    const owner = await Owner.findAll({
        where: {
            Email: req.body.email
        }
    });
    if (owner.length > 0) {
        res.status(400).send('Owner already registered');
        return;
    }

    //hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    //create the owner
    try {
        const createdOwner = await Owner.create({
            Email: req.body.email,
            Password: hashed,
            Name: req.body.name,
            Surname: req.body.surname
        });
        //send email of created owner as confirmation
        res.status(201).send({email: createdOwner.dataValues.Email});
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
