const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const Tags = require('./tag');
const Menu = require('./menu');

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
    classMethods: {
        associate: () => {
            TaggedMenu.hasMany(Tags, {
                foreignKey: 'Tag'
            });
            TaggedMenu.hasMany(Menu, {
                foreignKey: 'Menu_ID'
            })
        }
    }
},
{
    freezeTableName: true,
    timestamps: false
});

module.exports = TaggedMenu;