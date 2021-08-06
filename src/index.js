const express = require("express");
const cors = require("cors");

const questionRoute = require('./controllers/question.controller');
const replyRoute = require('./controllers/reply.controller');
const conversationRoute = require('./controllers/conversation.controller');
const messageRoute = require('./controllers/message.controller');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/question', questionRoute);
app.use('/reply', replyRoute);
app.use('/conversation', conversationRoute);
app.use('/message', messageRoute)


module.exports = app;
