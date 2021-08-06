const mongoose = require("mongoose");

const connect = () => {
  return mongoose.connect(
    "mongodb+srv://doubtFlow:doubtFlow@cluster0.4x7wj.mongodb.net/doubtFlow?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }, () => {
        console.log("Connected to the database!")
    }
  );
};

module.exports = connect;
