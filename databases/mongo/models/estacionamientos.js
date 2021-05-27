const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    name: {type: String, required: true},
    auto: [{type: Schema.Types.ObjectId, refs: 'Autos'}],
})

const model = mongoose.model('Estacionamiento', schema);

module.exports = model;