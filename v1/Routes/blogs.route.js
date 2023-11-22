const express = require('express');
const blogsController = require("../Controllers/blogs.controller");
const verifyToken = require("../Middlewares/verifyToken");
const router = express.Router();


// add a part
router.post("/", verifyToken, blogsController.addABlog);

// update a part
router.patch("/", verifyToken, blogsController.updateABlog);

// get all parts
router.get("/", blogsController.getAllBlogs);

// get single part
router.get("/:id", verifyToken, blogsController.getSingleBlog);

// delete a part
router.delete("/:id", verifyToken, blogsController.deleteABlog);



module.exports = router;