const { Router } = require("express");
const router = Router();
const Comment = require("../models/comment.model");
const protect = require("../middleware/protect");
router.get("/:postId", async (req, res) => {
  try {
    const comments = Comment.find({ postId: req.params.postId });
    return res.statusCode(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const comment = Comment.create(req.body);
    return res.statusCode(200).json({ comment });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});
module.exports = router;
