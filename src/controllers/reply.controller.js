const express = require('express');
const router = express.Router();
const ReplyModel = require('../models/reply');

//Creating an answer for a question
router.post('/', async (req, res) => {
    const newReply  = new ReplyModel(req.body);
    try {
        const reply = await newReply.save();
        return res.status(201).json(reply)
    } catch(err) {
        return res.status(500).json(err);
    }
})

//Get all replies of a question
router.get('/:questionId', async (req, res) => {
    const id = req.params.questionId;
    try {
        const replies = await ReplyModel.find({questionId: id}).lean().exec();
        return res.status(200).json(replies);
    } catch(err) {
        return res.status(500).json(err);
    }
})

module.exports = router;