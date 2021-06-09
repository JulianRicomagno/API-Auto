const Joi = require('@hapi/joi');

// Valida el login : user, password y el recordarme.

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().required()
});



module.exports = schema;