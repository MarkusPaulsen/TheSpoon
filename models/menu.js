const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const MenuItem = require('./menuItem');

const Menu = db.define('Menu', {
    Menu_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    }
},{
    freezeTableName: true,
    timestamps: false
}, {
    classMethods: {
        associate: () => {
            Menu.hasMany(MenuItem, {
                foreignKey: 'Menu_ID'
            });
        }
    }
}
);

module.exports = Menu;