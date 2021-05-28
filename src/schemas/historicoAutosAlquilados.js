const Joi = require('@hapi/joi');

const schema = Joi.object({
    date: Joi.date().required(),
    auto: Joi.string(),
    user: Joi.string()
});

module.exports = schema;