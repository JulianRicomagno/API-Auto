const { mongo: { usersModel, autosModel, historicoModel }, } = require('../../databases');
const { findOne } = require('../../databases/mongo/models/autos');
const { encryptPassword, validatePassword } = require('../../helpers/bcrypt');
const Boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');

module.exports = {
    getAll: async (req, res) => {
        const users = await usersModel.find();
        res.json(users);
    },
    createOne: async (req, res) => {
        const { firstName, lastName, age, document, password, mail } = req.body;
        const newUser = new usersModel({ firstName, lastName, age, document, password, mail });

        await newUser.save();

        res.send(`El usuario ${newUser.firstName}, ha sido registrado`);
    },
    updatedOne: async (req, res) => {
        const { _id } = req.params;
        const { firstName, lastName, age, document } = req.body;
        const returnValue = await usersModel.findByIdAndUpdate(
            _id, {
            $set: { firstName, lastName, age, document },
        }, { useFindAndModify: false },
        );
        console.log(returnValue);
        res.send('User updated');
    },
    deleteOne: async (req, res) => {
        const { _id } = req.params;
        const removed = await usersModel.findByIdAndDelete(_id);
        console.log(removed);
        res.send('Deleted');
    },
    alquilarAuto: async (req, res) => {
        //Recibo ID usuario
        const { _id } = req.params;
        //Recibo ID auto par alaquilar
        const { auto } = req.body;

        //Asigno el auto al Usuario
        await usersModel.findByIdAndUpdate(
            _id, {
            $push: { auto },
        }, { useFindAndModify: false },
        );

        //Creo la transaccion historica
        const newHistorico = new historicoModel({ date: Date.now(), auto: auto, user: _id });
        await newHistorico.save();

        //Asigno el auto al Usuario
        await autosModel.findByIdAndUpdate(
            auto, {
            $set: { estado: 'Alquilado' },
        }, { useFindAndModify: false },
        );

        res.send('Transacción realizada con Exito');
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
        }, { useFindAndModify: false },
        );

        //Asigno el auto al Usuario
        await usersModel.findByIdAndUpdate(
            _id, {
            $pull: { auto },
        }, { useFindAndModify: false },
        );



        res.send('Alquiler Terminado');
    },

    signUp: async (req, res) => {
        const { firstName, lastName, age, document, password, mail, username } = req.body;
        try {
            const hashedPass = await encryptPassword(password);
            const registeredUser = new usersModel({ firstName, lastName, age, document, password: hashedPass, mail, username });
            await registeredUser.save((err) => {
                if (err) {
                    return res.status(409).send(Boom.conflict('Error 409. Already Exists.'));
                } // Por si las dudas
                res.send(`El usuario ${registeredUser.firstName} ${registeredUser.lastName}. Username: ${registeredUser.username}, ha sido registrado con éxito.`);
                //aca se puede meter el signin asi? para que cuando se registre ya se le habra la sesion :D 
                //opc 1: pisar el body
                // req.body = {username: username, password: hashedPass};
                //signIn(req, res);
                /*
                function async signInRegistrado(username , res){
                    const userFound = await findOne({username});
                    const token = generateToken(userFound);
                    res.send(userFound, token);

                const miResponse = await signInRegistrado(username);
                res.send(`el usuario se registro`, miResponse.userFound, miResponse.token);

                }*/

            });
        } catch (error) { res.send(error.message); }
    },

    //agregue status y el envio de userFound y el token
    signIn: async (req, res) => {
        try {
            const { username, password } = req.body;
            const userFound = await usersModel.findOne({ username });
            if (userFound == null) { return res.send('Failed credentials'); }
            const validated = await validatePassword(password, userFound.password);
            if (!validated) { return res.send('Failed credentials'); }
            const token = generateToken(userFound);
            return res.status(200).send({ userFound, token });
        } catch (error) { res.status(401).send(error.message); }



        // TODA LA LOGICA DE JWT VA ACÁ - Usuario encontrado (username) Password validada (validated)
        function generateToken(user) {
            const token = jwt.sign({ _id: user._id }, 'secretKey', { duration: '0,2h' });
            return token;
        }


    }
};