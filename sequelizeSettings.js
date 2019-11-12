const Sequelize = require('sequelize');
const dbURL = 'postgres://vlbganljybqkij:19f31cdd0c3704ba6f463d0236de1e224187121d17811cb950b46c29daa5ace4@ec2-54-246-100-246.eu-west-1.compute.amazonaws.com:5432/d9dfhu5citam1c?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';


const postgresDb = new Sequelize(dbURL);

module.exports = postgresDb;