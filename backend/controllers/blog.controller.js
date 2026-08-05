const { Blog } = require("../models/blog.model");
const cloudinary = require("../utils/cloudinary.js").default || require("../utils/cloudinary.js");
const getDataUri = require("../utils/getDataUri.js").default || require("../utils/getDataUri.js");

exports.createBlog = async (req, res) => {
  try {
    const { title, category } = req.body;
    const file = req.file;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Blog title and category are required",
      });
    }

    let thumbnailUrl = "";

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      thumbnailUrl = cloudResponse.secure_url;
    }

    const blog = await Blog.create({
      title,
      category,
      thumbnail: thumbnailUrl,
      author: req.id,
    });

    return res.status(201).json({
      success: true,
      blog,
      message: "Blog created successfully",
    });
  } catch (error) {
    console.log("Create Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create blog",
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const { title, subtitle, description, category } = req.body;
    const file = req.file;

    let blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // 🔒 AUTHORIZATION GUARD: Sirf blog ka owner hi edit kar sakta h
    if (blog.author.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only edit your own blog",
      });
    }

    // 👈 IMPORTANT FIX: author: req.id yahan se HATA diya h taaki ownership transfer na ho!
    const updateData = { title, subtitle, description, category };

    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      updateData.thumbnail = cloudResponse.secure_url;
    }

    blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error updating blog",
    });
  }
};

exports.getOwnBlogs = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    const blogs = await Blog.find({ author: userId }).populate({
      path: "author",
      select: "firstName lastName photoUrl",
    });

    return res.status(200).json({
      blogs: blogs || [],
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

exports.getPublishedBlog = async (_, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "firstName lastName photoUrl",
      });

    return res.status(200).json({
      success: true,
      blogs: blogs || [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get published blogs",
      error: error.message,
      success: false,
    });
  }
};

exports.togglePublishBlog = async (req, res) => {
  try {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
        success: false,
      });
    }

    // 🔒 AUTHORIZATION GUARD: Check owner
    if (blog.author.toString() !== req.id) {
      return res.status(403).json({
        message: "Unauthorized operation",
        success: false,
      });
    }

    blog.isPublished = !blog.isPublished;
    await blog.save();

    const statusMessage = blog.isPublished ? "Published" : "Unpublished";

    return res.status(200).json({
      success: true,
      message: `Blog is ${statusMessage}`,
      isPublished: blog.isPublished,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update status",
      error: error.message,
      success: false,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    // 🔒 AUTHORIZATION GUARD: Only Owner can delete
    if (blog.author.toString() !== req.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You can only delete your own blog",
      });
    }

    await Blog.findByIdAndDelete(blogId);

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log("Delete Blog Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
    });
  }
};