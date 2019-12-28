const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Search=require('./search.js');

const Customer = db.define('Customer', {
    Username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    },
    Nationality: {
        type: Sequelize.STRING
    },
    AgeRange: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    Gender: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

Customer.hasMany(Search, {
    foreignKey: 'Username'
});

module.exports = Customer;