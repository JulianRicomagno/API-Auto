const Joi = require('@hapi/joi');


const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    document: Joi.number().required(),
    password: Joi.string().required(),
    mail: Joi.string().required(),
    username: Joi.string().required(),
    isAdmin: Joi.boolean().required()
});

//asdasdasdasd
module.exports = schema;