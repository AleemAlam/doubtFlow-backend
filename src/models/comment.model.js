const { Schema, model } = require("mongoose");
const commentSchema = Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "question",
    },
    content: {
      type: String,
    },
  },
  {
    timeStamp: true,
    versionKey: false,
  }
);

module.exports = model("comment", commentSchema);
