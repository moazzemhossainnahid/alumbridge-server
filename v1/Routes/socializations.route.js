const express = require('express');
const socializationsController = require("../Controllers/socializations.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


// add a post
router.post("/", verifyToken, socializationsController.addAPost);

// update a post
router.patch("/:id", verifyToken, socializationsController.updateAPost);

// add a comment
router.put("/:id/comments", verifyToken, socializationsController.addAComment);

// delete a comment
router.delete("/:postId/comments/:commentId", verifyToken, socializationsController.deleteAComment);

// get all posts
router.get("/", socializationsController.getAllPosts);

// get single post
router.get("/:id", verifyToken, socializationsController.getSinglePost);

// delete a blog
router.delete("/:id", verifyToken, socializationsController.deleteAPost);



module.exports = router;