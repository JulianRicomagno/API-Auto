const {mongo: {autosModel},} = require('../../databases');
const Boom = require('@hapi/boom');

module.exports = {
    getAll: async (req,res)=>{
        const autos = await autosModel.find();
        res.status(200).json(autos); 
    },
    createOne: async (req,res)=>{
        const {modelo, marca, año, estado, usersList} = req.body;
        
        const newAuto = new autosModel({modelo, marca, año, estado: 'Disponible'});

        if(req.file){
            newAuto.imagen = req.file.path;
        };

        await newAuto.save();

        res.status(200).send(`El auto ${newAuto.modelo}, ${newAuto.marca} ha sido guardado`); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {modelo, marca, año, imagen } = req.body;
        //const returnValue = 
        await autosModel.findByIdAndUpdate(
            _id, {
                $set: {modelo, marca, año, imagen},
            }, { useFindAndModify: false},(err, auto) => {
                if (!auto) return res.status(404).send(Boom.notFound("Auto no existente"));
                console.log(auto);
                res.status(200).send({ auto: auto });
            }
        );
        //console.log(returnValue);
        //res.send('Auto updated'); 
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        //const removed = 
        await autosModel.findByIdAndDelete(_id,(err, auto) => {
            if (!auto) return res.status(404).send(Boom.notFound("Auto no existente"));
            console.log(auto);
            res.status(200).send({
                message: 'El auto fue eliminado',
                body: {
                    auto
                }});
        }
    );
        console.log('removed'); 
    },
};