const Joi = require('@hapi/joi');


const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required(),
    mail: Joi.string().required(),
    username: Joi.string().required(),
    permsToken: Joi.string()
});


module.exports = schema;