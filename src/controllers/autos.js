const {mongo: {autosModel},} = require('../../databases');

module.exports = {
    getAll: async (req,res)=>{
        const autos = await autosModel.find();
        res.json(autos); 
    },
    createOne: async (req,res)=>{
        const {modelo, marca, año, estado, imagen, usersList} = req.body;
        const newAuto = new autosModel({modelo, marca, año, estado: 'Disponible', imagen});
        
        await newAuto.save();

        res.send(`El auto ${newAuto.modelo}, ${newAuto.marca} ha sido guardado`); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {modelo, marca, año, imagen } = req.body;
        const returnValue = await autosModel.findByIdAndUpdate(
            _id, {
                $set: {modelo, marca, año, imagen},
            }, { useFindAndModify: false},
        );
        console.log(returnValue);
        res.send('Auto updated'); 
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        const removed = await autosModel.findByIdAndDelete(_id);
        console.log(removed);
        res.send('Deleted'); 
    },
};