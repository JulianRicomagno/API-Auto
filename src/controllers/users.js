const { mongo: { usersModel, autosModel, historicoModel }, } = require('../../databases');
const { encryptPassword, validatePassword } = require('../../helpers/bcrypt');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const {JWTsecret, PERMS_KEY, ERRORLIST} = require('../../config/index');
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');

function validatePermissions(permsToken){
    if(permsToken == null){return false}
    return (permsToken == PERMS_KEY ? true : false);
}

function validateStringSchemas(received, type){    
    switch(type){
        case 'USERNAME':
            let usernameSchema = new passwordValidator();
            usernameSchema
            .is().min(3)
            .is().max(24)
            .has().letters()
            .has().not().spaces()
            .has().not().symbols();
            return (usernameSchema.validate(received));
        case 'PASSWORD':
            let passwordSchema = new passwordValidator();
            passwordSchema
            .is().min(6)
            .is().max(32)
            .has().letters()
            .has().digits(3)
            .has().not().spaces();
            return (passwordSchema.validate(received));
        case 'EMAIL':
            return (emailValidator.validate(received));
    }
}

function generateToken(user, expires) {
    const token = jwt.sign({ _id: user._id }, JWTsecret, { expiresIn: expires });
    return token;
}

module.exports = {
    getAll: async (req, res) => {
        const users = await usersModel.find();
        res.status(200).json(users);
    },

    createOne: async (req, res) => {
        const { firstName, lastName, age, document, password, mail } = req.body;
        const newUser = new usersModel({ firstName, lastName, age, document, password, mail });
        await newUser.save();
        res.status(200).send(`El usuario ${newUser.firstName}, ha sido registrado`);
    },

    updatedOne: async (req, res) => {
        const { _id } = req.params;
        const { firstName, lastName, age, document, isAdmin } = req.body;
        const returnValue = await usersModel.findByIdAndUpdate(
            _id, {
            $set: { firstName, lastName, age, document, isAdmin },
        }, { useFindAndModify: false }, (err, uss) =>{
            if(!uss){
                res.status(404).send(Boom.notFound("No existe Usuario con el ID solicitado"))
            }else{
                res.status(200).send({
                    message: "datos modificados exitosamente",
                    body: uss
                })
                    //console.log(returnValue);
                    console.log(uss);
            }
        }
        );
        
    },
    deleteOne: async (req, res) => {
        const { _id } = req.params;
        const removed = await usersModel.findByIdAndDelete(_id, (err, uss) =>{
            if(!uss){
                res.status(404).send(Boom.notFound("No existe Usuario con el ID solicitado"))
            }else{
                res.status(200).send({
                    message: "Usuario eliminado exitosamente",
                    body: uss
                })
                    //console.log(removed);
                    console.log(uss);
            }
        });
    },

    alquilarAuto: async (req, res) => {
        //Recibo ID usuario
        const { _id } = req.params;
        //Recibo ID auto par alaquilar
        const { auto } = req.body;

        //Le paso el auto por el req que recibo y luego le paso a la variable user el usuario
        const variableAuto = await autosModel.findById(auto);
        const variableUsers = await usersModel.findById(_id);
        //const autos = JSON.parse(variable);
        
        console.log(variableAuto.estado);
        console.log(variableUsers.auto);
        //valido que el auto este disponible y luego que el usuario no tenga auto alquilado
        if(variableAuto.estado == "Disponible"){
            if(variableUsers.auto.length == 0){
                //Asigno al auto el estado Alquilado, si este existe...
                await autosModel.findByIdAndUpdate(
                    auto, {
                    $set: { estado: 'Alquilado' },
                    }, { useFindAndModify: false }, err =>{
                        if(err){
                        res.status(404).send(Boom.notFound("el ID del auto es incorrecto"));
                    }
                });

                //Asigno el auto al Usuario, si este existe...
                await usersModel.findByIdAndUpdate(
                    _id, {
                    $push: { auto },
                    }, { useFindAndModify: false }, (err, uss) =>{
                        if(!uss){
                        res.status(404).send(Boom.notFound("No existe Usuario con el ID solicitado"))
                        }
                    });
        
                //Creo la transaccion historica        
                const newHistorico = new historicoModel({ date: Date.now(), auto: auto, user: _id });
                await newHistorico.save();
                res.status(200).send('Transacción realizada con Exito');
            };
            res.status(406).send(Boom.notAcceptable('El usuario ya tiene un auto alquilado'));
        };
        res.status(406).send(Boom.notAcceptable("El auto ya fue alquilado"))
    },

    terminarAlquiler: async (req, res) => {
        //Recibo ID usuario
        const { _id } = req.params;
        //Recibo ID auto par alaquilar
        const { auto } = req.body;

        //Asigno el auto al Usuario
        await autosModel.findByIdAndUpdate(
            auto, {
            $set: { estado: 'Disponible' },
        }, { useFindAndModify: false }, err =>{
            if(err){
                res.status(404).send(Boom.notFound("el ID del auto es incorrecto"));
            }
        })
        ;

        //Asigno el auto al Usuario
        await usersModel.findByIdAndUpdate(
            _id, {
            $pull: { auto },
        }, { useFindAndModify: false }, (err, uss) =>{
            if(!uss){
                res.status(404).send(Boom.notFound("No existe Usuario con el ID solicitado"))
            }
        });
        
        res.status(200).send('Alquiler Terminado');
    },

    signUp: async (req, res) => {
        const { firstName, lastName, age, document, password, mail, username, permsToken} = req.body;
        
        // SI A ALGUIEN SE LE OCURRE UNA FORMA PARA QUE ESTO QUEDE MÁS LINDO QUE ME AVISE :P
        if(!validateStringSchemas(password , 'PASSWORD')){
            return res.send(ERRORLIST.passInvalida);
        }
        if(!validateStringSchemas(username, 'USERNAME')){
            return res.send(ERRORLIST.userInvalido)
        }
        if(!validateStringSchemas(mail, 'EMAIL')){
            return res.send(ERRORLIST.emailInvalido);
        }
        try {
            const perms = validatePermissions(permsToken);
            const hashedPass = await encryptPassword(password);
            const registeredUser = new usersModel({ firstName, lastName, age, document, password: hashedPass, mail, username , isAdmin: perms});
            await registeredUser.save((err) => {
                if (err) {
                    return res.status(409).send(Boom.conflict('Error 409. Already Exists.'));
                } // Por si las dudas
                res.send(`El usuario ${registeredUser.firstName} ${registeredUser.lastName}. Username: ${registeredUser.username}, ha sido registrado con éxito.`);

                // si se puede lo hacemos

                //aca se puede meter el signin asi? para que cuando se registre ya se le habra la sesion :D 
                //opc 1: pisar el body
                // req.body = {username: username, password: hashedPass};
                //signIn(req, res);

                /* opc 2 - otro login solo de uso interno
                function async signInRegistrado(username , res){
                    const userFound = await findOne({username});
                    const token = generateToken(userFound);
                    res.send(userFound, token);

                const miResponse = await signInRegistrado(username);
                res.send(`el usuario se registro`, miResponse.userFound, miResponse.token);

                }*/

            });
        } catch (error) { 
            res.send(error.message); }
    },

    //agregue status y el envio de userFound y el token
    signIn: async (req, res) => {
        try {
            const { username, password, rememberMe } = req.body;
            const userFound = await usersModel.findOne({ username });
            
            if (userFound == null) { 
                return res.send('Failed credentials'); 
            }

            const validated = await validatePassword(password, userFound.password);
            
            if (!validated) { 
                return res.send('Failed credentials'); 
            }
            if(rememberMe){  
            const token = generateToken(userFound, "1y");
            return res.status(200).send({ 
                usuario: userFound,
                token: token 
            });
            }
            const token = generateToken(userFound, "2h");
            return res.status(200).send({ 
                usuario: userFound,
                token: token 
            });
        } catch (error) {
            res.status(401).send(error.message); 
            }
    }
};

//asdasdasdasd//asdasdasdasd