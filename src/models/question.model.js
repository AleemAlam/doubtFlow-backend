const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const questionSchema = new Schema(
  {
    title: { type: String, required: true },
    question: { type: String, required: true },
    tags: [{ type: String, required: true }],
    creator: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timeStamp: true,
    versionKey: false,
  }
);

module.exports = model("question", questionSchema);
