const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Tag = require('./tag.js');
const Menu = require('./menu.js');

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


TaggedMenu.belongsTo(Tag, {
    foreignKey: 'Tag',
    as: 'Tags'
});

module.exports = TaggedMenu;