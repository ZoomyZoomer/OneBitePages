const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const CookingSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    img: {type: String, required: true},
}, {
    timestamps: true,
});

const CookingModel = model('Cooking_Topic', CookingSchema);
module.exports = CookingModel;