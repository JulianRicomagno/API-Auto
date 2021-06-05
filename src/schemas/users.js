const Joi = require('@hapi/joi');

// isAdmin no se agrega aún -

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    document: Joi.number().required(),
    password: Joi.string().required(),
    mail: Joi.string().required(),
    username: Joi.string().required()
});

module.exports = schema;