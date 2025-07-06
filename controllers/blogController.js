// controllers/blogController.js
const Blog = require('../model/blog');

// @desc    Create a new blog
// @route   POST /api/blogs
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const newBlog = await Blog.create({
      title,
      content,
      author,
      user: req.user._id, // link blog to logged-in user
    });

    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error while creating blog' });
  }
};

// @desc    Get all blogs
// @route   GET /api/blogs
// @desc    Get all blogs (with optional search and filter)
// @route   GET /api/blogs?search=...&author=...
const getAllBlogs = async (req, res) => {
  try {
    const { search, author } = req.query;

    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (author) {
      query.author = { $regex: author, $options: 'i' };
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs' });
  }
};


// @desc    Get a blog by ID
// @route   GET /api/blogs/:id
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the blog' });
  }
};

// @desc    Update a blog by ID
// @route   PUT /api/blogs/:id
const updateBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Ownership check
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this blog' });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.author = author || blog.author;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the blog' });
  }
};

// @desc    Delete a blog by ID
// @route   DELETE /api/blogs/:id
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    // Ownership check
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this blog' });
    }

    await blog.remove();
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the blog' });
  }
};

const addCommentToBlog = async (req, res) => {
  try {
    const { commentText } = req.body;

    if (!commentText) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const comment = {
      commentText,
      commenter: req.user.name // or email
    };

    blog.comments.push(comment);
    await blog.save();

    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
};
// controllers/blogController.js

module.exports = {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addCommentToBlog,
};
