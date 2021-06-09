const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {JWTsecret} = require('../../config')
const { mongo: { usersModel}} = require('../../databases');


// valida que el usuario tenga rol Administrador
module.exports = () =>{
        return async(req, res, next) =>{
        try {
            const token = req.header('Authorization');
            const decoded = jwt.decode(token);
            console.log('id: ' + decoded._id);
            const userFound = await usersModel.findById(decoded._id);
            console.log(userFound.username);
            if(userFound.isAdmin){
                next();
            }else{
                res.status(403).send(Boom.forbidden());
            }
        } catch (error) {
            res.status(422).send(Boom.badData());
        }
    };
}


