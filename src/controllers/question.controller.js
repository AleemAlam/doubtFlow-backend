const express = require('express');
const router = express.Router();
const QuestionModel = require('../models/question.model');

//Creating new question
router.post('/', async (req, res) => {
    const newQuestion  = new QuestionModel(req.body);
    try {
        const question = await newQuestion.save();
        return res.status(201).json(question)
    } catch(err) {
        return res.status(500).json(err);
    }
})

//Getting all the question asked by a user
router.get('/:userId', async (req, res) => {
    const id = req.params.userId;
    try {
        const questions = await QuestionModel.find({userId: id}).lean().exec();
        return res.status(200).json(questions);
    } catch(err) {
        return res.status(500).json(err);
    }
})

module.exports = router;