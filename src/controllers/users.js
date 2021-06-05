const {mongo: {usersModel, autosModel, historicoModel},} = require('../../databases');
const { findOne } = require('../../databases/mongo/models/autos');
const {encryptPassword, validatePassword} = require('../../helpers/bcrypt');
const Boom = require('@hapi/boom');

module.exports = {
    getAll: async (req,res)=>{
        const users = await usersModel.find();
        res.json(users); 
    },
    createOne: async (req,res)=>{
        const {firstName, lastName, age, document, password, mail} = req.body;
        const newUser = new usersModel({firstName, lastName, age, document, password, mail});
        
        await newUser.save();

        res.send(`El usuario ${newUser.firstName}, ha sido registrado`); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {firstName, lastName, age, document} = req.body;
        const returnValue = await usersModel.findByIdAndUpdate(
            _id, {
                $set: {firstName, lastName, age, document},
            }, { useFindAndModify: false},
        );
        console.log(returnValue);
        res.send('User updated'); 
    },
    deleteOne: async (req,res)=>{
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
                $push: {auto},
            }, { useFindAndModify: false},
        );

        //Creo la transaccion historica
        const newHistorico = new historicoModel({date: Date.now() , auto: auto, user: _id});
        await newHistorico.save();

        //Asigno el auto al Usuario
        await autosModel.findByIdAndUpdate(
            auto, {
                $set: {estado: 'Alquilado'},
            }, { useFindAndModify: false},
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
                $set: {estado: 'Disponible'},
            }, { useFindAndModify: false},
        );

        //Asigno el auto al Usuario
        await usersModel.findByIdAndUpdate(
            _id, {
                $pull: {auto},
            }, { useFindAndModify: false},
        );

        

        res.send('Alquiler Terminado');
    },

    signUp: async (req, res) => {           
        const {firstName, lastName, age, document, password, mail, username} = req.body;
        //try{
            const hashedPass = await encryptPassword(password);
            const registeredUser = new usersModel({firstName, lastName, age, document, password: hashedPass, mail, username});
            await registeredUser.save();
            res.send('Finished');
            //await registeredUser.save((err) => {
            //    if(err){return res.send(Boom.notAcceptable('Ya existe.'))}
            //    return res.send(`El usuario ${registeredUser.username}, ha sido registrado con éxito.`);
            //});
        //}catch(error){return res.send(Boom.notAcceptable());}
    },

    signIn: async (req, res) =>{
        const {username, password} = req.body;
        const userFound = await usersModel.findOne({username});
        if(userFound == undefined){return res.send('Failed credentials');}
        const validated = await validatePassword(password, userFound.password);
        if(!validated){return res.send('Failed credentials');}
        return res.send('fin');

        // TODA LA LOGICA DE JWT VA ACÁ - Usuario encontrado (username) Password validada (validated)

    }
};