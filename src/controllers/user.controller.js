const { Router } = require("express");
const router = Router();
const User = require("../models/user.model");
const newToken = require("../utils/jwt");
router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).exec();
    if (user) {
      return res
        .status(400)
        .json({ status: "failed", message: "Email already exists" });
    }
    user = await User.create(req.body);
    return res.status(201).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "invalid email",
      });
    }
    const match = await user.checkPassword(req.body.password);
    if (!match)
      return res.status(401).json({
        status: "failed",
        message: "invalid  password",
      });
    const token = newToken(user);
    return res.status(200).json({ user, token });
  } catch (e) {
    return res
      .status(500)
      .json({ status: "failed", message: "Something went wrong" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const users = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
});

module.exports = router;
