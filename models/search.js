const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Search = db.define('Search', {
        Search_ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Username: {
            type: Sequelize.STRING
        },
        SearchedWord: {
            type: Sequelize.STRING
        },
        NumberOfSearches: {
            type:  Sequelize.INTEGER
        }
    },
    {
        freezeTableName: true,
        timestamps: false
    }
);


module.exports = Search;