const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const MenuItem = db.define('MenuItem', {
    MI_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Menu_ID: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    Price: {
        type: Sequelize.FLOAT
    },
    ImageLink: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = MenuItem;