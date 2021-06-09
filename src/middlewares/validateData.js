const Boom = require('@hapi/boom');

//validador de los esquemas
module.exports = (schema) =>{
        return async(req, res, next) =>{
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.status(422).send(Boom.badData());
        }
    };
}


