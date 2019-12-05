const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const ItemReview = require('./itemReview.js');

const MenuReview = db.define('MenuReview', {
        Review_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: Sequelize.STRING
        },
        Menu_ID: {
            type: Sequelize.INTEGER
        },
        Date: {
            type: Sequelize.DATE
        },
        ServiceRating: {
            type: Sequelize.INTEGER
        },
        QualityRating: {
            type: Sequelize.INTEGER
        },
        Status: {
            type: Sequelize.TEXT
        },
        Image_ID: {
            type: Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);


MenuReview.hasMany(ItemReview, {
    foreignKey: 'MI_ID'
});

module.exports = MenuReview;