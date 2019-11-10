const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Customer = db.define('Customer', {
    Email: {
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
    Birthday: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Customer;