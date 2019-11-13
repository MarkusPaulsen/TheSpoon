const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Menu = db.define('Menu', {
    MenuID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    tags: { 
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
},{
    freezeTableName: true,
    timestamps: false
});

module.exports = Menu;