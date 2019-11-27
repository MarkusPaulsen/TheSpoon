const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const MenuItem = require('./menuItem');
const Restaurant =  require('./restaurants');
const TaggedMenu = require('./taggedMenu');


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
    },
},
    {
    freezeTableName: true,
    timestamps: false
} , {
    classMethods: {
        associate: () => {
            Menu.hasMany(MenuItem, {
                foreignKey: 'Menu_ID'
            });
            Menu.belongsTo(Restaurant, {
                foreignKey: 'Restaurant_ID'
            });
            Menu.hasMany(TaggedMenu, {
                foreignKey: 'Menu_ID'
            })
        }
    }
}
);

module.exports = Menu;