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
        const returnValue = await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $set: {name},
            }, { useFindAndModify: false}, (err, est) => {
                if(!est){
                    res.status(404).send(Boom.notFound("Error al intentar modificar los datos del estacionamiento solicitado"))
                }else{
                    res.status(200).send({
                        message: "Se modificaron los valores exitosamente",
                        body: est
                })
                    console.log(est);
                    //console.log(returnValue);
                }
            }
        );
        
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        const removed = await estacionamientosModel.findByIdAndDelete(_id, (err, est)=>{
            if(!est){
                res.status(404).send(Boom.notFound("No existe estacionamiento con el ID solicitado"))
            }else{
                res.status(200).send("Se eliminó el estacionaminto exitosamente")
                console.log(est);
                //console.log(removed);
            }
        });
    },


    assingCar: async (req, res) => {
        const { _id } = req.params;
        const { auto } = req.body;

        const agregado = await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $push: {auto},
            }, { useFindAndModify: false}, (err, est) => {
                if(!est){
                    res.status(404).send(Boom.notFound("Error, no existe el estacionamiento solicitado"))
                }else{
                    res.status(200).send({
                        message: "asignacion exitosa",
                        body: est
                })
                    console.log(est);
                    //console.log(agregado);
                }
            }
        );

    },
    removeCar: async (req, res) =>{
        const { _id } = req.params;
        const { auto } = req.body;

        const removido = await estacionamientosModel.findByIdAndUpdate(
            _id, {
                $pull: {auto},
            }, { useFindAndModify: false}, (err, removed) =>{
                if(!removed){
                    res.status(404).send(Boom.notFound("Error, no existe el estacionamiento solicitado"))
                }else{
                    res.status(200).send("Auto removido exitosamente")
                    console.log(removed);
                    //console.log(removido);
                }
            }
        );
    },
};