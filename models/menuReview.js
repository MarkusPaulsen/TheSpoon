const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');


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
        Content: {
            type: Sequelize.STRING
        },
        Rating: {
            type: Sequelize.INTEGER
        },
        Date: {
            type: Sequelize.DATE
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = MenuReview;