const express = require('express');
const router = express();
router.use(express.json());

const bcrypt = require('bcrypt');

const Customer = require('./models/customer.js');

router.post('/', async (req, res) => {
    //check if the the email is already taken (it must be unique, it's the primary key)
    const customer = await Customer.findAll({
        where:  {
            Email: req.body.email
        }
    });
    if (customer.length > 0) {
        res.status(400).send('Customer already registered');
        return;
    }
    //hash the password with a salt
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);
    //create the customer
    try{
        const createdCustomer= await Customer.create({
            Email: req.body.email,
            Password: hashed,
            Firstname: req.body.name,
            Surname: req.body.surname,
            Nationality: req.body.nationality,
            Birthday: req.body.birthday
        });
        //send email of created customer as confirmation
        res.status(201).send({email: createdCustomer.dataValues.Email});
    }
    catch (error){
        res.status(400).send(error);
    }
});

module.exports = router;