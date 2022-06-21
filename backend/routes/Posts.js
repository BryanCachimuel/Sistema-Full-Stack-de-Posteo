const express = require("express");
const router = express.Router();
const { Posts, Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listOfPost = await Posts.findAll({ include: [Likes] });
  res.json(listOfPost);
});

router.get("/porId/:id", async (req, res) => {
  const id = req.params.id;
  const postid = await Posts.findByPk(id);
  res.json(postid);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.username = req.user.username;
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
        id: postId,
    },
});
res.json("Eliminado Satisfactoriamente")

})

module.exports = router;