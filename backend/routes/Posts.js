const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");

router.get("/", async (req, res) => {
  const listOfPost = await Posts.findAll({ include: [Likes] });
  res.json(listOfPost);
});

router.get("/porId/:id", async (req, res) => {
  const id = req.params.id;
  const postid = await Posts.findByPk(id);
  res.json(postid);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;