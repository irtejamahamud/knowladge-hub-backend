const Post = require("../models/Post");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "username"
    );
    res.json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json(post);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.json({ message: "Post deleted" });
};

exports.likePost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: "You already liked this post" });
    }

    post.likes.push(userId);
    await post.save();
    res.json({ message: "Post liked", likes: post.likes.length });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });

    const index = post.likes.map((id) => id.toString()).indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ error: "You haven't liked this post" });
    }

    post.likes.splice(index, 1);
    await post.save();
    res.json({ message: "Post unliked", likes: post.likes.length });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
