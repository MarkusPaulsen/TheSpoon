const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    //the token is supposed to be in x-auth-token header, the first thing to be done is checking if it's there
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied: no token provided.');

    try {
        //if the token is correct, just go to the next middleware and req.user is the identified username
        const result = jwt.verify(token, config.get('jwtPrivateKey'));
        req.username = result.username;
        next();
    } catch (e) {
        res.status(401).send('Access denied: invalid token.');
    }
};