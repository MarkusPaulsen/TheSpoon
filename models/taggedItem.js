const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Tag = require('./tag.js');
const MenuItem = require('./menuItem.js');


const TaggedItem = db.define('TaggedItem', {
    MI_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    Tag: {
        type: Sequelize.STRING,
        primaryKey: true
    }
}, {
    freezeTableName: true,
    timestamps: false
});

TaggedItem.belongsTo(Tag, {
    foreignKey: 'Tag',
    as: 'Tags'
});


module.exports = TaggedItem;