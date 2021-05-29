const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema ({
    date: {type: Date, required: true},
    auto: {type: Schema.Types.ObjectId, ref: 'Autos', autopopulate: true},
    user: {type: Schema.Types.ObjectId, ref: 'Users', autopopulate: true}
})

schema.plugin(require('mongoose-autopopulate'));

const model = mongoose.model('Historico', schema);

module.exports = model;