const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const MenuItem = require('./menuItem');
const Restaurant =  require('./restaurants');

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
    },
    Restaurant_ID: {
        type: Sequelize.STRING,

    }
},
    {
    freezeTableName: true,
    timestamps: false
} , {
    classMethods: {
        associate: () => {
            Menu.hasMany(MenuItem, {
                foreignKey: 'Menu_ID',
            });
            Menu.belongsTo(Restaurant, {
                foreignKey: 'Restaurant_ID',
            });
        }
    }
}
);
/*
Menu.associate = () => {
    Menu.hasMany(MenuItem, {
        foreignKey: 'Menu_ID'
    });
    Menu.belongsTo(Restaurant, {
        foreignKey: 'Restaurant_ID'
    });
}

*/
module.exports = Menu;