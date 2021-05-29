const {
    mongo: {estacionamientosModel},
} = require('../../databases');

module.exports = {
    getAll: async (req,res)=>{
        const estacionamientos = await estacionamientosModel.find();
        res.json(estacionamientos); 
    },
    createOne: async (req,res)=>{
        const {name} = req.body;
        const newEstacionamiento = new estacionamientosModel({name});

        await newEstacionamiento.save();
        res.send('Saved'); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {name} = req.body;
        const returnValue = await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $set: {name},
            }, { useFindAndModify: false},
        );
        console.log(returnValue);
        res.send('Estacionamiento updated'); 
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        const removed = await estacionamientosModel.findByIdAndDelete(_id);
        console.log(removed);
        res.send('Deleted'); 
    },
    assingCar: async (req, res) => {
        const { _id } = req.params;
        const { auto } = req.body;

        await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $push: {auto},
            }, { useFindAndModify: false},
        );

        res.send('Auto asigando a Estacionamiento');
    },
    removeCar: async (req, res) =>{
        const { _id } = req.params;
        const { auto } = req.body;

        await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $pull: {auto},
            }, { useFindAndModify: false},
        );

        res.send('Auto eliminado del Estacionamiento');
    },
};