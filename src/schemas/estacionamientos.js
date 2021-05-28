const Joi = require('@hapi/joi');

const schema = Joi.object({
    name: Joi.string().required(),
    auto: Joi.string(),
});

module.exports = schema;