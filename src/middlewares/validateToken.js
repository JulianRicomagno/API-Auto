const jwt = require('jsonwebtoken');
//const {JWTsecret} = require('../../config/index/JWTsecret')
const {JWTsecret} = require('../../config')

//validador del Token
module.exports = ()=> {
    return (req, res, next) => {
    console.log("entro");
    try{
        const token = req.header('Authorization');
        console.log(token);

        const data = jwt.verify(token, JWTsecret) ;
        
/*
        data 
        ? data.replace('Bearer ' , '') 
        : console.log("algo salio mal :(");
*/
        console.log(data);
        next();
    }catch(error){
        return res.status(401).send({error: error.message + 'you must signIn'});
    }
}
    

};
