const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().required(),
    location: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),

});

module.exports = schema;