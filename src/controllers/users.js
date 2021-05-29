const {mongo: {usersModel},} = require('../../databases');

module.exports = {
    getAll: async (req,res)=>{
        const users = await usersModel.find();
        res.json(users); 
    },
    createOne: async (req,res)=>{
        const {firstName, lastName, age, document, auto, password, mail} = req.body;
        const newUser = new usersModel({firstName, lastName, age, document, auto, password, mail});
        
        await newUser.save();

        res.send(`El usuario ${newUser.firstName}, ha sido registrado`); 
    },
    updatedOne: async (req,res)=>{
        const { _id } = req.params;
        const {firstName, lastName, age, document, auto, password, mail} = req.body;
        const returnValue = await usersModel.findByIdAndUpdate(
            _id, {
                $set: {firstName, lastName, age, document, auto, password, mail},
            }, { useFindAndModify: false},
        );
        console.log(returnValue);
        res.send('User updated'); 
    },
    deleteOne: async (req,res)=>{
        const { _id } = req.params;
        const removed = await usersModel.findByIdAndDelete(_id);
        console.log(removed);
        res.send('Deleted'); 
    },
};