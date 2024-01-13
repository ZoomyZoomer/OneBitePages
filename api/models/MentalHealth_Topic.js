const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const MentalHealthSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    img: {type: String, required: true},
}, {
    timestamps: true,
});

const MentalHealthModel = model('MentalHealth_Topic', MentalHealthSchema);
module.exports = MentalHealthModel;