const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    document: {type: Number, required: true},
    auto: {type: Schema.Types.ObjectId, refs: 'Autos'},
    password: {type: String},
    mail: {type: String}
})

const model = mongoose.model('Users', schema);

module.exports = model;