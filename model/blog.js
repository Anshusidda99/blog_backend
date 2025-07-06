// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // 💬 Add comments array
  comments: [
    {
      commentText: { type: String, required: true },
      commenter: { type: String, default: 'Anonymous' },
      createdAt: { type: Date, default: Date.now }
    }
  ],

  createdAt: { type: Date, default: Date.now }
});
