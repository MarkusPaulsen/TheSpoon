const Joi = require('joi');
module.exports = (schema) => {
    return (req, res, next) => {
        const result = Joi.validate(req.body, schema);
        //If the req.body doesn't match the schema, send error message
        if (result.error)
            res.status(400).send('Invalid input.');
        else next();
    }
};