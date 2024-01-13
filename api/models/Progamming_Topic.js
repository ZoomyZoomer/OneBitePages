const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const ProgrammingSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    img: {type: String, required: true},
}, {
    timestamps: true,
});

const ProgrammingModel = model('Programming_Topic', ProgrammingSchema);
module.exports = ProgrammingModel;