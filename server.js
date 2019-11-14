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


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./API_reference.yaml');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));




//those are all the routes
const login = require('./routes/login.js');
const registrationCustomer = require('./routes/registrationCustomer.js');
const registrationOwner = require('./routes/registrationOwner.js');
const image=require('./routes/image-upload.js');
const searchByMenuItem = require('./routes/searchByMenuItem.js');


app.use('/api/user/login', login);
app.use('/api/user/customer/register', registrationCustomer);
app.use('/api/user/owner/register', registrationOwner);
app.use('/api/image',image);
app.use('/api/user/customer/menu/searchByMenuItem', searchByMenuItem);


//Test DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

app.use(bodyParser.json());


//START OF THE REQUIRED CODE TO MAKE THE DEPLOY WORK
//NOTE: currently not working, since build doesn't work

const path = require("path");

app.use(express.static(path.join(__dirname, "thespoon", "build")));

/*
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "thespoon", "build", "index.html"));

});

*/


//END OF THE REQUIRED CODE TO MAKE THE DEPLOY WORK

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port));

