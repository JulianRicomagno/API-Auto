const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    name: {type: String, required: true},
    auto: [{type: Schema.Types.ObjectId, ref: 'Autos', autopopulate: true}],
})

schema.plugin(require('mongoose-autopopulate'));

const model = mongoose.model('Estacionamiento', schema);

module.exports = model;