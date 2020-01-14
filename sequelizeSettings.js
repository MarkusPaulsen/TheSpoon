const Sequelize = require('sequelize');
const config = require('config');
const dbURL = config.get('sequelize_Database');


const postgresDb = new Sequelize(dbURL);

module.exports = postgresDb;