const config = require('config');

module.exports = () => {
    if (!config.get('jwtPrivateKey')){
        console.error('FATAL ERROR: jwtPrivateKey is not defined');
        return false;
    }
    if (!config.get('jwtExpirationTime')){
        console.error('FATAL ERROR: jwtExpirationTime is not defined');
        return false;
    }
    if (!config.get('AWS_ACCESS_KEY_ID')){
        console.error('FATAL ERROR: AWS_ACCESS_KEY_ID is not defined');
        return false;
    }
    if (!config.get('AWS_SECRET_ACCESS_KEY')){
        console.error('FATAL ERROR: AWS_SECRET_ACCESS_KEY is not defined');
        return false;
    }
    if (!config.get('companySecret')){
        console.error('FATAL ERROR: companySecret is not defined');
        return false;
    }
    else return true;
};


