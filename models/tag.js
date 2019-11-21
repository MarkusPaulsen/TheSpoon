const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const taggedItem = require('./taggedItem');
const taggedMenu = require('./taggedMenu');

const Tag = db.define('Tag', {
    Name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Color: {
        type: Sequelize.STRING
    }
},{
    classMethods: {
        associate: () => {
            Tag.hasMany(taggedItem, {
                foreignKey: 'Name'
            })
        },
        associate: () => {
            Tag.hasMany(taggedMenu, {
                foreignKey: 'Name'
            })
        }
    }
},
    {
    freezeTableName: true,
    timestamps: false
});

module.exports = Tag;