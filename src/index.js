const express = require("express");
const cors = require("cors");


const userController = require("./controllers/user.controller");
const passport = require("./config/passport");

const questionRoute = require('./controllers/question.controller');
const replyRoute = require('./controllers/reply.controller');
const conversationRoute = require('./controllers/conversation.controller');
const messageRoute = require('./controllers/message.controller');


const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/users", userController);
app.use('/question', questionRoute);
app.use('/reply', replyRoute);
app.use('/conversation', conversationRoute);
app.use('/message', messageRoute)
passport.serializeUser(function (user, done) {
  done(null, user);
});


passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.status(200).json({ status: req.user.user, token: req.user.token });
  }
);




app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

module.exports = app;
