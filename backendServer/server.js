const express = require('express');
const bodyParser = require('body-parser');
//let pg = require('pg');
const Sequelize = require('sequelize');
const db = require('./sequelizeSettings');

const app = express();
app.use(express.json());

//Test if express works
app.get('/', (req, res) =>
    res.send('hello world'));

//const db = boh.database;
//const postgresDb = new Sequelize('postgres://vlbganljybqkij:19f31cdd0c3704ba6f463d0236de1e224187121d17811cb950b46c29daa5ace4@ec2-54-246-100-246.eu-west-1.compute.amazonaws.com:5432/d9dfhu5citam1c?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory');



//Test DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));


app.use(bodyParser.json());


const Customer = db.define('Customer', {
    Email: {
        type: Sequelize.STRING
    },
    Password: {
        type: Sequelize.STRING
    },
    Firstname: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    },
    Nationality: {
        type: Sequelize.STRING
    },
    BirthDay: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true
});


app.get('/api/user/customer/register', (req, res) => {
    Customer.create({
        Email: req.body.email,
        Password: req.body.password,
        Firstname: req.body.name,
        Surname: req.body.surname,
        Nationality: req.body.nationality,
        BirthDay: req.body.birthday
    })

});




const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port));


