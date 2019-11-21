const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const OpeningHours = db.define('OpeningHours', {
    Restaurant_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    Day: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    OpenTime: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    CloseTime: {
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = OpeningHours;