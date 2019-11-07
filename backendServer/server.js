const express = require('express');
const bodyParser = require('body-parser');
const db = require('./sequelizeSettings');

const app = express();
app.use(express.json());

const config = require('config');

if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

//those are all the routes
const login = require('./login.js');
const registrationCustomer = require('./registrationCustomer.js');
const registrationOwner = require('./registrationOwner.js');
app.use('/api/user/login', login);
app.use('/api/user/customer/register', registrationCustomer);
app.use('/api/user/owner/register', registrationOwner);

//Test DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

app.use(bodyParser.json());


const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port));

