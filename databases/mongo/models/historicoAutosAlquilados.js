const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    date: {type: Date, required: true},
    auto: {type: Schema.Types.ObjectId, refs: 'Autos'},
    user: {type: Schema.Types.ObjectId, refs: 'Users'}
})

const model = mongoose.model('Historico', schema);

module.exports = model;