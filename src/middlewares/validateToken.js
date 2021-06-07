const jwt = require('jsonwebtoken');

//validador del Token
module.exports = ()=> {
        (req, res, next) => {
    try{
        const token = req.header('Token');
        // cambiar secretKey por algo en .env
        jwt.verify(token, 'secretKey');
        next();
    }catch(error){
        res.status(401).send({error: error.message + 'you must signIn'});
    }
}
    

};
