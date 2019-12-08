const express = require('express');
const db = require('./sequelizeSettings');

const app = require('./router.js');

const isEnvironmentSet = require('./utils/environmentVariablesCheck.js');

if (!isEnvironmentSet()){
    process.exit(1);
}

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./API_reference.yaml');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Test DB
db.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

//START OF THE REQUIRED CODE TO MAKE THE DEPLOY WORK

const path = require("path");

app.use(express.static(path.join(__dirname, "thespoon", "build")));

/*
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "thespoon", "build", "index.html"));

});

*/

//END OF THE REQUIRED CODE TO MAKE THE DEPLOY WORK

const port = process.env.PORT || 80;

app.listen(port, () => console.log('Server started on port ' + port));

