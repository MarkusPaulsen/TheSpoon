const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const TaggedMenu = db.define('TaggedMenu', {
    Menu_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Tag: {
        type: Sequelize.STRING,
        primaryKey: true
    }
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports = TaggedMenu;