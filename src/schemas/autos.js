const Joi = require('@hapi/joi');

const schema = Joi.object({
    modelo: Joi.string().required(),
    marca: Joi.string().required(),
    año: Joi.number().required(),
    estado: Joi.string(),
    imagen: Joi.string(),
    usersList: Joi.string()
});

module.exports = schema;