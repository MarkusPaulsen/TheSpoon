const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Owner = db.define('Owner', {
    Username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Owner;