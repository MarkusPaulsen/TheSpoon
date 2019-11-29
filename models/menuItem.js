const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const TaggedItem=require('./taggedItem.js');
const Tag=require('./tag.js');

const MenuItem = db.define('MenuItem', {
    MI_ID: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Menu_ID: {
        type: Sequelize.INTEGER
    },
    Name: {
        type: Sequelize.STRING
    },
    Description: {
        type: Sequelize.STRING
    },
    Price: {
        type: Sequelize.FLOAT
    },
    ImageLink: {
        type: Sequelize.STRING
    },
    Type: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

MenuItem.hasMany(TaggedItem, {
    foreignKey: 'MI_ID'
});

TaggedItem.belongsTo(Tag, {
    foreignKey: 'Tag',
    as: 'Tags'
});


module.exports = MenuItem;