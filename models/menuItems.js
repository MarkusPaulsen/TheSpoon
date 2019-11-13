const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const MenuItems = db.define('Menu', {
    MenuItemID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    MenuID: {
        type: Sequelize.INTEGER,
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    tags: { 
        type: Sequelize.ARRAY(Sequelize.STRING)
    }, 
    price: {
        type: Sequelize.FLOAT
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = MenuItems;