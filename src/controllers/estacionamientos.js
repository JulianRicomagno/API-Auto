const {
    mongo: {estacionamientosModel},
} = require('../../databases');

module.exports = {
    getAll: async (req,res)=>{
        const estacionamientos = await estacionamientosModel.find();
        res.json(estacionamientos); 
    },
    createOne: async (req,res)=>{
        const {name, auto} = req.body;
        const newEstacionamiento = new estacionamientosModel();

        newEstacionamiento.name = name;
        newEstacionamiento.auto = auto;

        await newEstacionamiento.save();
        res.send('Saved'); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {name, auto} = req.body;
        const returnValue = await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $set: {name, auto},
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
};