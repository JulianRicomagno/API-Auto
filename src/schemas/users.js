const Joi = require('@hapi/joi');

const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    document: Joi.number().required(),
    auto: Joi.string(),
    password: Joi.string(),
    mail: Joi.string()
});

module.exports = schema;