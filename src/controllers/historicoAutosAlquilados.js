const {mongo: {historicoModel},} = require('../../databases');

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
        const returnValue = await historicoModel.findByIdAndUpdate(
            _id, {
                $set: {date, auto, user},
            }, { useFindAndModify: false}, (err) =>{
                if(err){
                    res.status(404).send(Boom.notFound("solicitud incorrecta"));
                }else{
                    res.status(200).send("modificacion exitosa")
                    //console.log(returnValue);
                }
            }
        );
    },

    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        const removed = await historicoModel.findByIdAndDelete(_id, (err, historico)=>{
            if(!historico){
                res.status(404).send(Boom.notFound("no se pudo eliminar el historico de alquiler"));
            }else{
                res.status(200).send({
                    message: "eliminacion exitosa del hisotial",
                    body: historico
                });
                //console.log(removed);
                console.log(historico);
            }
        });
        
    },
};