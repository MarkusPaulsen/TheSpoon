const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

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

module.exports = TaggedItem;