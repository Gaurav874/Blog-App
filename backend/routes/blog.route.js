const express = require("express");
const isAuthenticated = require("../middleware/isAuthenticated");
const singleUpload = require("../middleware/multer"); // Multer instance
const { createBlog, updateBlog, getOwnBlogs, getPublishedBlog, togglePublishBlog, deleteBlog } = require("../controllers/blog.controller");

const router = express.Router();

// 👈 Yahan singleUpload middleware add kar diya hai
router.route("/").post(isAuthenticated, singleUpload, createBlog);

// Update route mein field name 'thumbnail' pass karo (agar singleUpload mein direct upload.single('thumbnail') nahi hai)
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog);
router.route("/get-own-blogs").get(isAuthenticated, getOwnBlogs);
router.route("/get-published-blogs").get(getPublishedBlog);
router.route("/:blogId").patch(isAuthenticated, togglePublishBlog);
router.route("/delete/:blogId").delete(isAuthenticated, deleteBlog);

module.exports = router;