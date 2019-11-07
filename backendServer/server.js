const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const db = require('./sequelizeSettings');

const app = express();
app.use(express.json());

const config = require('config');

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}


//Test DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));


app.use(bodyParser.json());


const Customer = db.define('Customer', {
    Email: {
        type: Sequelize.STRING,
        primaryKey: true
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
    Birthday: {
        type: Sequelize.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});


const Owner = db.define('Owner', {
    Email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Password: {
        type: Sequelize.STRING
    },
    Firstname: {
        type: Sequelize.STRING
    },
    Surname: {
        type: Sequelize.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

app.post('/api/user/customer/register', (req, res) => {
     Customer.create({
        Email: req.body.email,
        Password: req.body.password,
        Firstname: req.body.name,
        Surname: req.body.surname,
        Nationality: req.body.nationality,
        Birthday: req.body.birthday
    })
         .then((customer) => res.status(201).send(customer))
         .catch((error) => res.status(400).send(error));

});

app.post('/api/user/owner/register', (req, res) => {
    Owner.create({
        Email: req.body.email,
        Password: req.body.password,
        Firstname: req.body.name,
        Surname: req.body.surname
    })
        .then((owner) => res.status(201).send(owner))
        .catch((error) => res.status(400).send(error));
});




const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port));

