require('dotenv').config();
//const {JWTsecret} = require('../../config');

const {
    //nested estructured
    environmentUtils: {validateRequiredEnvs}, 
} = require('./utils');

const requiredEnvs = ['PORT', 'MONGO_URI'];
validateRequiredEnvs(requiredEnvs);

const { mongoDBHelpers } = require('./helpers');
const { connection, ConnectionStates } = require('mongoose');

(async () => {
    await mongoDBHelpers.connect();
    +process.argv[2] && require('./databases/mongo/fake')();
    require('./server');
})();

process.on('SIGINT', () => {
    mongoDBHelpers.disconnect().then((connectionState) => {
        console.log(`Database disconenct, conection state: ${connectionState}`);
        console.log('Closing process');
        process.exit(0);
    });
});
