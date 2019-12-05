const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const ItemReview = db.define('ItemReview', {
    Review_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Username: {
        type: Sequelize.STRING
    },
    MI_ID: {
        type: Sequelize.INTEGER
    },
    Content: {
        type: Sequelize.STRING
    },
    ItemRating: {
        type: Sequelize.INTEGER
    },
    Date: {
        type: Sequelize.DATE
    },
    MenuReview_ID: {
        type: Sequelize.INTEGER
    }
},
    {
        freezeTableName: true,
        timestamps: false
    }
);

module.exports = ItemReview;