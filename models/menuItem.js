const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const Menu = require('./menu');



const MenuItem = db.define('MenuItem', {
    MI_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Menu_ID: {
        type: Sequelize.INTEGER,
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    Price: {
        type: Sequelize.FLOAT
    }
}, {
    freezeTableName: true,
    timestamps: false
} ,
    {
    classMethods: {
        associate: () => {
            MenuItem.belongsTo(Menu), {
                foreignKey: 'Menu_ID',
            };
        }
    }
}
);

module.exports = MenuItem;