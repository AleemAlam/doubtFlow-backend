const express = require("express");
const cors = require("cors");

const userController = require("./controllers/user.controller");
const questionController = require("./controllers/question.controller");
const commentController = require("./controllers/comment.controller");
const passport = require("./config/passport");
const replyRoute = require("./controllers/reply.controller");
const conversationRoute = require("./controllers/conversation.controller");
const messageRoute = require("./controllers/message.controller");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/users", userController);

app.use("/reply", replyRoute);
app.use("/conversation", conversationRoute);
app.use("/message", messageRoute);

app.use("/question", questionController);
app.use("/comment", commentController);

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
