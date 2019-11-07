const express = require('express');
const router = express();
router.use(express.json());

const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const Owner = require('./models/owner.js');

const Customer = require('./models/customer.js');

router.post('/', async (req, res) => {
    //first of all, check if there is a user with given username
    //if it's an owner the check has to be done on Owner table, Customer otherwise
    let user;
    if (req.body.isRestaurantOwner) {
        user = await Owner.findAll({
            where: {
                Email: req.body.email
            }
        });}
    else {
        user = await Customer.findAll({
            where: {
                Email: req.body.email
            }
        });}
    //if there isn't a user with given name, send error message
    if (user.length <= 0) res.status(400).send('Invalid username or password');
    else {
        //check if the password is correct
        const isValid = await bcrypt.compare(req.body.password, user[0].dataValues.Password);
        if (!isValid) res.status(400).send('Invalid username or password');
        else {
            //if the password is valid, send the token to the user
            const token = jwt.sign({email: req.body.email}, config.get('jwtPrivateKey'));
            res.status(201).send({token: token});
        }
    }
});

module.exports = router;