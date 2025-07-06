// routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addCommentToBlog,
} = require('../controllers/blogController');
const { protect } = require('../middleware/auth');



// Create a blog
router.post('/', createBlog);

// Get all blogs
router.get('/', getAllBlogs);

// Get one blog by ID
router.get('/:id', getBlogById);

// Update blog by ID
router.put('/:id', updateBlog);

// Delete blog by ID
router.delete('/:id', deleteBlog);

router.post('/:id/comments', protect, addCommentToBlog); // Protect the route to create a blog

module.exports = router;
