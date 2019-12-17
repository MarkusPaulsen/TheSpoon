const Joi = require('joi');
const schemas = {
    loginValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5),
        isRestaurantOwner: Joi.boolean()
    }),
    registrationCustomerValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
        email: Joi.string().trim().email({minDomainAtoms: 1}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
    }),
    registrationOwnerValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        surname: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        email: Joi.string().trim().email({minDomainAtoms: 1}).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
    }),
    addMenuValidation: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        description: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        tags: Joi.array().items(Joi.string().regex(/^[a-zA-Z0-9]/))
    }),
    editMenuValidation: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        description: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        tags: Joi.array().items(Joi.string().regex(/^[a-zA-Z0-9]/))
    }),
    configureDataOfRestaurantValidation: Joi.object().keys({
        name: Joi.string().min(1).required(),
        address: Joi.string().min(1).required(),
        city: Joi.string().min(1).required(),
        country: Joi.string().min(1).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        imageID: Joi.number().integer().required(),
        openingHours: Joi.array().items(Joi.object().keys({
            day: Joi.string(),
            openTime: Joi.string(),
            closeTime: Joi.string()
        }))
    })

    // define all the other schemas below

};
module.exports = schemas;