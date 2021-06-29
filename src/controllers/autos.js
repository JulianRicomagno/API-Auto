const {mongo: {autosModel},} = require('../../databases');
const Boom = require('@hapi/boom');

module.exports = {
    getAll: async (req,res)=>{
        const autos = await autosModel.find();
        res.status(200).json(autos); 
    },

    createOne: async (req,res)=>{
        //que seria userList??
        const {modelo, marca, año, estado, imagen} = req.body;
        const newAuto = new autosModel({modelo, marca, año, estado: 'Disponible', imagen});
        await newAuto.save();
        res.status(200).send(`El auto ${newAuto.modelo}, ${newAuto.marca} ha sido guardado`); 
    },

    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {modelo, marca, año, imagen } = req.body;
       // const returnValue = 
        await autosModel.findByIdAndUpdate(
            _id, 
            {$set: {modelo, marca, año, imagen},
            }, { useFindAndModify: false}, (err, auto) => {
                if(!auto){
                    return res.status(404).send(Boom.notFound("Error al intentar modificar los datos del auto"));
                }else{
                    return res.status(200).send("Valores modificado correctamente");
                }
            }
        );
    },

    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        await autosModel.findByIdAndDelete(_id, (err, auto)=> {
            if(!auto){
                return res.status(404).send(Boom.notFound("Error , no existe auto con el ID solicitado"));
            }else{
                return res.status(200).send({
                    messege: "Auto eliminado correctamente",
                    body: { auto}
                });
                //console.log(removed);
            }
            
        });
    },
};