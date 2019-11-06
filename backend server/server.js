let express = require('express');
let bodyParser = require('body-parser');
//let morgan = require('morgan');
let pg = require('pg');

let app = express();

//Test if express works
app.get('/', (req, res) =>
    res.send('hello world'));


//const db = require('backend server/sequelizeSettings.js');
//const db = boh.database;

const Sequelize = require('sequelize');

const postgresDb = new Sequelize('postgres://vlbganljybqkij:19f31cdd0c3704ba6f463d0236de1e224187121d17811cb950b46c29daa5ace4@ec2-54-246-100-246.eu-west-1.compute.amazonaws.com:5432/d9dfhu5citam1c?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory');


//Test DB
postgresDb.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));


app.use(bodyParser.json());
//app.use(morgan('foo'));



/*let pool = new pg.Pool({
    user: '',
    database: '',
    password: '',
    host: '',
    port: 5432,
}); */


let port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port));


