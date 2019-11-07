const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Owner = db.define('Owner', {
    Email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Firstname: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Owner;