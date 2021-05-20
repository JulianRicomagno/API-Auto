require('dotenv').config();

const {
    //nested estructured
    environmentUtils: {validateRequiredEnvs}, 
} = require('./utils');

const requiredEnvs = ['PORT'];

validateRequiredEnvs(requiredEnvs);
require('./server');