const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Menu = db.define('Menu', {
    Menu_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Restaurant_ID: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Menu;