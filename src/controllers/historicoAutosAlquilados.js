const {mongo: {historicoModel},} = require('../../databases');
const Boom = require('@hapi/boom');

module.exports = {
    getAll: async (req,res)=>{
        const historico = await historicoModel.find();
        res.status(200).json(historico); 
    },
    createOne: async (req,res)=>{
        const {date, auto, user} = req.body;
        const newAlquiler = new historicoModel({date, auto, user});
        
        await newAlquiler.save();

        res.status(200).send(`El alquiler ha sido registrado`); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {date, auto, user} = req.body;
        //const returnValue = 
        await historicoModel.findByIdAndUpdate(
            _id, {
                $set: {date, auto, user},
            }, { useFindAndModify: false}, (err, historico) => {
                if (!historico) return res.status(404).send(Boom.notFound("El Alquiler no existe"));
                console.log(historico);
                res.status(200).send({ historico: historico });
            }
        );
        //console.log(returnValue);
        //res.status(200).send('Alquiler updated'); 
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        //const removed = 
        await historicoModel.findByIdAndDelete(_id, (err, historico) => {
            if (!historico) return res.status(404).send(Boom.notFound("El Alquielr no existe"));
            console.log(historico);
            res.status(200).send({
                message: 'El alquiler fue eliminado',
                body: {
                    historico
                }});
        });
        console.log('removed');
        //res.status(200).send('Deleted'); 
    },
};