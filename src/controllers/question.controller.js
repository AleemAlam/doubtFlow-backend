const { Router } = require("express");
const router = Router();
const Question = require("../models/question.model");
const protect = require("../middleware/protect");
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find().lean().exec();
    return res.status(200).json({ questions });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const question = await Question.find({ _id: req.params.postId })
      .lean()
      .exec();
      console.log(req.params.postId)
    return res.status(200).json({ question });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const question = await Question.create(req.body);
    return res.status(200).json({ question });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});
module.exports = router;
