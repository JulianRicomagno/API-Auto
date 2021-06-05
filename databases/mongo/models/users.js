const mongoose = require('mongoose');
const { Schema } = mongoose;

// "isAdmin" agregado pero no utilizado por ahora (veo si llego a hacer roles.)

const schema = new Schema ({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    age: {type: Number, required: true},
    document: {type: Number, required: true},
    auto: [{type: Schema.Types.ObjectId, ref : 'Autos', autopopulate: false}],
    password: {type: String, required: true},
    mail: {type: String, required: true, unique: true},
    username: {type: String, required: true, unique: true},
    isAdmin: {type: Boolean}
}, { timestamps: true })

schema.plugin(require('mongoose-autopopulate'));

const model = mongoose.model('Users', schema);

module.exports = model;