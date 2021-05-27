const {
    mongo: {estacionamientosModel},
} = require('../../databases');

module.exports = {
    getAll: (req,res)=>{
        res.send('working'); 
    },
    createOne: async (req,res)=>{
        const {name, auto} = req.body
        const newEstacionamiento = new estacionamientosModel();
        
        newEstacionamiento.name = name;
        newEstacionamiento.auto = auto;

        await newEstacionamiento.save();

        res.send('Saved'); 
    },
    updatedOne: (req,res)=>{
        res.send('working'); 
    },
    deleteOne: (req,res)=>{
        res.send('working'); 
    },
};