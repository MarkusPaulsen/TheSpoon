const Joi = require('joi');
const schemas = {
    loginValidation: Joi.object().keys({
        username: Joi.string(),
        password: Joi.string(),
        isRestaurantOwner: Joi.boolean()
    }),
    registrationCustomerValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
        email: Joi.string().trim().email({minDomainAtoms: 1}).required(),
        password: Joi.string().min(5).required(),
    }),
    registrationOwnerValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        surname: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        email: Joi.string().trim().email({minDomainAtoms: 1}).required(),
        password: Joi.string().min(5).required(),
    }),
    registrationConsultantValidation: Joi.object().keys({
        username: Joi.string().regex(/^[a-zA-Z0-9]/).min(5).required(),
        password: Joi.string().min(5).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        surname: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        email: Joi.string().trim().email({minDomainAtoms: 1}).required(),
        companySecret: Joi.string().min(5).required()
    }),
    //Add an empty menu to a restaurant
    addMenuValidation: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        description: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        tags: Joi.array().items(Joi.string().regex(/^[a-zA-Z0-9]/))
    }),
    //Edit a menu's information (not its items)
    editMenuValidation: Joi.object().keys({
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        description: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        tags: Joi.array().items(Joi.string().regex(/^[a-zA-Z0-9]/))
    }),
    //Edit restaurant's information
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
    }),
    //Edit profile data of the owner
    editOwnerProfileValidation: Joi.object().keys({
        email: Joi.string().trim().email({minDomainAtoms: 1}).required(),
        name: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
        surname: Joi.string().regex(/^[a-zA-Z0-9]/).min(1).required(),
    }),
    //Change the password of the owner
    changeOwnerPassword: Joi.object().keys({
        oldPassword: Joi.strin().required(),
        newPassword: Joi.string().min(5).required(),
    })

    // define all the other schemas below

};
module.exports = schemas;