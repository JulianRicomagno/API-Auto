const faker = require('faker');
//const {autosModel} = require('../');

module.exports = /*async*/() => {
    for(let i = 0; i <= 10; i++ ){
        const auto = /*new autosModel()*/{
            vehicle: faker.vehicle.vehicle(),
            manufacturer: faker.vehicle.manufacturer(),
            model:faker.vehicle.model(),
            type:faker.vehicle.type(),
            fuel:faker.vehicle.fuel(),
            vin:faker.vehicle.vin(),
            color: faker.vehicle.color(),
        };
        /*await auto.save(); */
        console.log(auto);
    }
};