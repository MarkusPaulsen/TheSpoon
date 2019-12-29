const Sequelize = require('sequelize');
const db = require('../sequelizeSettings');

const Consultant = db.define('Consultant', {
    Username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Name: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    },
    Email: {
        type: Sequelize.STRING
    },
    CompanySecret: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = Consultant;