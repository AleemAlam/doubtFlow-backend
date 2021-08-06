const mongoose = require('mongoose');
const {model, Schema} = mongoose;
const replySchema = new Schema({
    text: {type: String, required: true},
    questionId: {type: String, required: true},
    userId: {type: String, required: true}, //userid
})

module.exports = model('reply', replySchema);