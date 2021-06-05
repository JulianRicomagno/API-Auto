const {
    mongo: {estacionamientosModel},
} = require('../../databases');
const Boom = require('@hapi/boom');

module.exports = {
    getAll: async (req,res)=>{
        const estacionamientos = await estacionamientosModel.find();
        res.status(200).json(estacionamientos); 
    },
    createOne: async (req,res)=>{
        const {name} = req.body;
        const newEstacionamiento = new estacionamientosModel({name});

        await newEstacionamiento.save();
        res.status(200).send('Saved'); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {name} = req.body;
        //const returnValue = 
        await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $set: {name},
            }, { useFindAndModify: false}, (err, estacionamiento) => {
                if (!estacionamiento) return res.status(404).send(Boom.notFound("El Estacionamiento no existente"));
                console.log(estacionamiento);
                res.status(200).send({ estacionamiento: estacionamiento });
            }
        );
        //console.log(returnValue);
        //res.send('Estacionamiento updated'); 
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        //const removed = 
        await estacionamientosModel.findByIdAndDelete(_id, (err, estacionamiento) => {
            if (!estacionamiento) return res.status(404).send(Boom.notFound("El Estacionamiento no existente"));
            console.log(estacionamiento);
            res.status(200).send({
                message: 'El estacionamiento fue eliminado',
                body: {
                    estacionamiento
                }});
        });
        console.log('removed');
        //res.send('Deleted'); 
    },
    assingCar: async (req, res) => {
        const { _id } = req.params;
        const { auto } = req.body;

        await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $push: {auto},
            }, { useFindAndModify: false},
        );

        res.status(200).send('Auto asigando a Estacionamiento');
    },
    removeCar: async (req, res) =>{
        const { _id } = req.params;
        const { auto } = req.body;

        await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $pull: {auto},
            }, { useFindAndModify: false},
        );

        res.status(200).send('Auto eliminado del Estacionamiento');
    },
};