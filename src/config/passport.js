const passport = require("passport");
const { v4: uuid } = require("uuid");

const newToken = require("../utils/jwt");
require("dotenv").config();

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const User = require("../models/user.model");
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
    },

    async function (accessToken, refreshToken, profile, done) {
      let user = await User.findOne({ email: profile?._json?.email });

      let token;
      if (user) {
      } else {
        user = await User.create({
          email: profile?._json?.email,
          password: uuid(),
          name: profile?._json?.name,
          role: "student",
        });
      }
      token = newToken(user);
      return done(null, { user, token });
    }
  )
);

module.exports = passport;
