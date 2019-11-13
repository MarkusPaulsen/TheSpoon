const jwt = require('jsonwebtoken');
const config = require('config');

//NOTE: not tested yet
module.exports = (req, res, next) => {
    //the token is supposed to be in x-auth-token header, the first thing to be done is checking if it's there
    const token = req.header('x-auth-token');
    if (!token) return res.status(403).send('Access denied: no token provided');

    try {
        //if the token is correct, just go to the next middleware and req.user is the identified username
        req.username = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    } catch (e) {
        res.status(403).send('Access denied: invalid token');
    }
};