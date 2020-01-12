const express = require('express');
const router = express();
router.use(express.json());

const bcrypt = require('bcrypt');

const Owner = require('../models/owner.js');

const inputValidator = require('../middleware/inputValidationMiddleware.js');
const validationSchema = require('../validationSchemas.js');
const auth = require('../middleware/authorizationMiddleware.js');
const isOwner = require('../middleware/checkIfOwnerMiddleware.js');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//Return profile data of the owner
router.get('/', auth, isOwner, async (req, res) => {
    try {
        //the owner was already found by isOwner middleware
        res.status(200).send({email: req.owner.Email, username: req.owner.Username, name: req.owner.Name, surname: req.owner.Surname})
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});

//Edit profile data of the owner
router.put('/', auth, inputValidator(validationSchema.editOwnerProfileValidation), isOwner, async (req, res) => {
    try {
        //check if the the email is already taken by another owner (it must be unique)
        const owners = await Owner.findAll({
            where: {
                Username: {[Op.ne]: req.owner.Username},
                Email: req.body.email
            }
        });
        if (owners.length > 0) return res.status(400).send('Email already taken.');

        //update the profile of the owner
        await Owner.update({
            Email: req.body.email,
            Name: req.body.name,
            Surname: req.body.surname},
            {
                where: {
                    Username: req.owner.Username
                }
            });

        //get the updated owner data to send it back as a response
        const ownerModified = await Owner.findAll({
           where: {
               Username: req.owner.Username
           }
        });

        res.status(200).send({email: ownerModified[0].dataValues.Email, username: ownerModified[0].dataValues.Username, name: ownerModified[0].dataValues.Name, surname: ownerModified[0].dataValues.Surname});
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});

//Delete profile of the owner
router.delete('/', auth, isOwner, async (req, res) => {
    try {
        //because of the "on delete cascade", it will also destroy owner's restaurant, menus, menu items
        await Owner.destroy({
            where: {
                Username: req.owner.Username
            }
        });
        res.status(200).send();
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error.');
    }
});

//Change password of the owner
router.put('/password', auth, inputValidator(validationSchema.changeOwnerPassword), isOwner, async (req, res) => {
    try {
        //check if the old password sent is correct
        const oldPassword = await Owner.findAll({
            attributes: ['Password'],
            where: {
                Username: req.owner.Username
            }
        });
        const isValid = await bcrypt.compare(req.body.oldPassword, oldPassword[0].dataValues.Password);
        if (!isValid) return res.status(400).send("Old password doesn't match.");

        //since the old password matches, it can be changed now
        //hash the new password with a salt
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.newPassword, salt);
        //update the password in the database
        await Owner.update({
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


module.exports = router;