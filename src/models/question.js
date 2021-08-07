const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const questionSchema = new Schema(
  {
    text: { type: String, required: true },
    tags: [{ type: String, required: true }],
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = model("question", questionSchema);
