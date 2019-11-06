let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');


let app = express();


app.use(bodyParser.json());
app.use(morgan('foo'));

let pool = new pg.Pool({
    user: '',
    database: '',
    password: '',
    host: '',
    port: 5432,
});


let port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server started on port ' + port));


