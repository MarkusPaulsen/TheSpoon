const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const Menu = require('./menu');


const Restaurant = db.define('Restaurant', {
        Restaurant_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
        },
        ImageLink: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = Restaurant;