const mongoose = require('mongoose');
const { Schema } = mongoose;


// IS ADMIN agregado - Tener en cuenta que cualquier usuario creado previo al miércoles (09/06) no va a tener el campo asignado.

const schema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    document: {type: Number, required: true},
    auto: [{type: Schema.Types.ObjectId, ref : 'Autos', autopopulate: false}],
    password: {type: String, required: true},
    mail: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean, required: true}
}, { timestamps: true })



schema.plugin(require('mongoose-autopopulate'));

const model = mongoose.model('Users', schema);

module.exports = model;