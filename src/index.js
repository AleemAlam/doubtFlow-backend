const express = require("express");
const cors = require("cors");

const questionController = require('./controllers/question.controller');
const replyController = require('./controllers/reply.controller');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/question', questionController);
app.use('/reply', replyController)


module.exports = app;
