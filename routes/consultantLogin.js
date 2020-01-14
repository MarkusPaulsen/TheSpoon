const express = require('express');
const router = express();
router.use(express.json());

const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');

const Consultant = require('../models/consultant.js');

const inputValidator = require('../middleware/inputValidationMiddleware.js');
const validationSchema = require('../validationSchemas.js');

router.post('/', inputValidator(validationSchema.loginValidation), async (req, res) => {
    console.log('In POST /api/consultant/login');
    try {
        // check if there is a consultant with given username
        const consultant = await Consultant.findOne({
            where: {
                Username: req.body.username
            }
        });

        //if there isn't a consultant with given name, send error message
        if (!consultant) res.status(400).send('Invalid username or password');
        else {
            //check if the password is correct
            const isValid = await bcrypt.compare(req.body.password, consultant.Password);
            if (!isValid) res.status(400).send('Invalid username or password');
            else {
                //if the password is valid, send the token to the consultant
                const token = jwt.sign({username: req.body.username}, config.get('jwtPrivateKey'), {expiresIn: config.get('jwtExpirationTime')});
                res.status(201).send({token: token});
            }
        }
    }catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;
