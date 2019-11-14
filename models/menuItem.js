const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const Menu = require('./menu');

const MenuItem = db.define('MenuItem', {
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
},
    {
    classMethods: {
        associate: () => {
            MenuItem.belongsTo(Menu, {
                foreignKey: 'MenuID'
            });
        }
    }
}
);

module.exports = MenuItem;