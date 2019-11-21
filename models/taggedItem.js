const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');
const Tag = require('./tag');
const MenuItem = require('./menuItem');

const TaggedItem = db.define('TaggedItem', {
    MI_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Tag: {
        type: Sequelize.STRING,
        primaryKey: true
    }
},{
    classMethods: {
        associate: () => {
            TaggedItem.hasMany(Tag, {
                foreignKey: 'Tag'
            });
            TaggedItem.hasMany(MenuItem, {
                foreignKey: 'MI_ID'
            })
        }
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = TaggedItem;