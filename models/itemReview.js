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

module.exports = ItemReview;