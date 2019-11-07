const express = require('express');
const router = express();
router.use(express.json());

const jwt = require('jsonwebtoken');
const config = require('config');

const Sequelize = require('sequelize');
const db = require('./sequelizeSettings');

const Owner = db.define('Owner', {
    Email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Firstname: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

const Customer = db.define('Customer', {
    Email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Firstname: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    },
    Nationality: {
        type: Sequelize.STRING
    },
    Birthday: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

router.post('/', (req, res) => {
    loginFunction(req, res);
});

const loginFunction = async (req, res) => {
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
    if (user.length <= 0) res.status(400).send('Invalid username or password');
    else {
        const isValid = req.body.password == user[0].dataValues.Password;
        if (!isValid) res.status(400).send('Invalid username or password');
        else {
            const token = jwt.sign({email: req.body.email}, config.get('jwtPrivateKey'));
            res.status(201).send({token: token});
        }
    }
};


module.exports = router;