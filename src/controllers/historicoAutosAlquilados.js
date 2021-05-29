const {mongo: {historicoModel},} = require('../../databases');

module.exports = {
    getAll: async (req,res)=>{
        const historico = await historicoModel.find();
        res.json(historico); 
    },
    createOne: async (req,res)=>{
        const {date, auto, user} = req.body;
        const newAlquiler = new historicoModel({date, auto, user});
        
        await newAlquiler.save();

        res.send(`El alquiler ha sido registrado`); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {date, auto, user} = req.body;
        const returnValue = await historicoModel.findByIdAndUpdate(
            _id, {
                $set: {date, auto, user},
            }, { useFindAndModify: false},
        );
        console.log(returnValue);
        res.send('Alquiler updated'); 
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        const removed = await historicoModel.findByIdAndDelete(_id);
        console.log(removed);
        res.send('Deleted'); 
    },
};