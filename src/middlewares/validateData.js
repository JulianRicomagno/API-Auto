const Boom = require('@hapi/boom');
const jwt = requiere('jsonwebtoken');

/*
module.exports = (schema) =>{
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.send(Boom.badData());
        }
    };
};*/

export default function tokenValidator(req, res, next){
    try{
        const token = req.header('Token');
        // cambiar secretKey por algo en .env
        jwt.verify(token, 'secretKey');
        next();
    }catch(error){
        res.status(401).send({error: error.message + 'you must signIn'});
    }
};


function validate(schema) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            res.send(Boom.badData());
        }
    };
};

module.exports = validate;