const { Router } = require("express");
const router = Router();
const Comment = require("../models/comment.model");
const protect = require("../middleware/protect");
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ questionId: req.params.postId })
      .lean()
      .exec();
    return res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.post("/:postId", protect, async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      questionId: req.params.postId,
    });
    return res.status(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});
module.exports = router;
