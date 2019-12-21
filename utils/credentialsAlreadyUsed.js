const Owner = require('../models/owner.js');
const Customer = require('../models/customer.js');
const Consultant = require('../models/consultant.js');

//the function sends an error response if the username of the email are already taken and returns true
//return false if both the username and the email are not already taken
module.exports = async (req, res) => {

    //check if the the username is already taken (it must be unique)
    let owner;
    let customer;
    let consultant;
    owner = await Owner.findAll({
        where: {
            Username: req.body.username
        }
    });
    customer = await Customer.findAll({
        where: {
            Username: req.body.username
        }
    });
    consultant = await Consultant.findAll({
        where: {
            Username: req.body.username
        }
    });
    if (owner.length > 0 || customer.length > 0 || consultant.length > 0) {
        res.status(400).send('Username already taken.');
        return true;
    }

    //check if the the email is already taken (it must be unique)
    owner = await Owner.findAll({
        where: {
            Email: req.body.email
        }
    });
    customer = await Customer.findAll({
        where: {
            Email: req.body.email
        }
    });
    consultant = await Consultant.findAll({
        where: {
            Email: req.body.email
        }
    });
    if (owner.length > 0 || customer.length > 0 || consultant.length > 0) {
        res.status(400).send('Email already taken.');
        return true;
    }
    return false;
};