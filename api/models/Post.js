const mongoose = require('mongoose');
const {Schema, model} = mongoose;


const PostSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    content: {type: String, required: true},
    topic: {type: String, required: true},
    img: {type: String, required: true},
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema);
module.exports = PostModel;