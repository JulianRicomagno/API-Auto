const bcrypt = require('bcrypt');
const { cryptSALT} = require('../config')

module.exports = {
        encryptPassword: async (password)=>{
        const salt = await getSaltAsync();
        return await bcrypt.hashSync(password,salt);
    },
    validatePassword: async(passwordReceived, encryptedPassword) =>{
        return await bcrypt.compareSync(passwordReceived, encryptedPassword);
    }
}

const getSaltAsync = async () =>{
    return await bcrypt.genSaltSync(+cryptSALT);
    }