const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const questionSchema = new Schema({
    title: {type: String, required: true},
    tags: [{type: String, required: true}],
    creator: {type: String, required: true},
})

module.exports = model('question', questionSchema);