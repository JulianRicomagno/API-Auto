const {mongo: {usersModel, autosModel, historicoModel},} = require('../../databases');

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
};