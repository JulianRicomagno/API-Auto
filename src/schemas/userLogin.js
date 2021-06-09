const Joi = require('@hapi/joi');

// isAdmin no se agrega aún -

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().required()
});

module.exports = schema;