const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Restaurant = db.define('Restaurant', {
    Restaurant_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Owner: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    Address: {
        type: Sequelize.STRING
    },
    City: {
        type: Sequelize.STRING
    },
    Country: {
        type: Sequelize.STRING
    },
    Latitude: {
        type: Sequelize.FLOAT
    },
    Longitude: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Restaurant;