const Comment = require("../models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { post, user, content } = req.body;
    const comment = await Comment.create({ post, user, content });
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "username")
      .populate("post", "title");
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate(
      "user",
      "username"
    );
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate("user", "username")
      .populate("post", "title");
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
