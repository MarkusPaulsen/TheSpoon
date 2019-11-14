const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const Menu = require('./menu');

const Restaurant = db.define('Restaurant', {
    Restaurant_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Owner: {
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER
    },
    Latitude: {
        type: Sequelize.INTEGER
    }
},{
    freezeTableName: true,
    timestamps: false
},{
    classMethods: {
        associate: () => {
            Restaurant.hasMany(Menu, {
                foreignKey: 'Restaurant_ID'
            });
        }
    }
});

module.exports = Restaurant;