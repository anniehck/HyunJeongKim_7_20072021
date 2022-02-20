const { Posts } = require("../models");
const fs = require("fs");

exports.createPost = async (req, res) => {
  let image;
  const { body, protocol, file } = req;
  if (body.content === null || !body.content) {
    return res.status(400).json({ message: "Content is required." });
  } else {
    if (file) {
      image = `${protocol}://${req.get("host")}/images/${
        file.filename
      }`;
    }

    const post = req.body;
    post.id = req.user.id;
    post.firstname = req.user.firstname;
    post.image = image;
    await Posts.create(post)
      .then((post) => {
        return res
          .status(201)
          .json({ message: "Post created with the ID " + post.id });
      })
      .catch((error) => {
        return res.status(400).json({ error: "An error has occurred. " + error });
      });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    return res.status(200).json({ listOfPosts: listOfPosts });
  } catch (error) {
    return res.status(400).json({ error: "An error has occurred. " + error });
  }
};

exports.getOnePost = async (req, res) => {
  id = req.params.id;
  await Posts.findOne({ where: { id: id } })
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((error) => {
      return res.status(400).json({ error: "An error has occurred. " + error });
    });
};

exports.modifyPost = async (req, res) => {
  id = req.params.id;
  let image;
  if (req.file) {
    Posts.findOne({ where: { id: id } });
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  await Posts.findOne({ where: { id: id } })
    .then(() => {
      Posts.update({ ...req.body, image: image }, { where: { id: id } });
      return res.status(200).json({ message: "Post ID " + id + " has been updated." });
    })
    .catch((error) => {
      return res.status(400).json({ error: "An error has occurred. " + error });
    });
};

exports.deletePost = (req, res) => {
  id = req.params.id;
  Posts.destroy({ where: { id: id } })
    .then(() => {
      return res.status(200).json({ message: "Post ID " + id + " has been deleted." });
    })
    .catch((error) => res.status(500).json({ error }));
};
