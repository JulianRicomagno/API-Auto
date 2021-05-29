const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    modelo: {type: String, required: true},
    marca: {type: String, required: true},
    año: {type: Number, required: true},
    estado: {type: String},
    imagen: {type: String}
})

const model = mongoose.model('Autos', schema);

module.exports = model;