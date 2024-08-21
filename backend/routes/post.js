const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Post = require("../model/Post");
const jwt = require("jsonwebtoken");

router.post("/createpost", async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      return res.status(400).json({ msg: "Provide all information" });
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId
    
    

    const newPost = new Post({
      user: userId,
      title,
      content,
    });
    await newPost.save();

    res.status(201).json({ msg: "Post created successfully", post: newPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user', 'username');
      
    
    if (!posts.length) {
      return res.status(404).json({ msg: "No posts found" });
    }
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports = router;
