const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  file: {
    type: mongoose.Types.ObjectId,
    ref: 'File',
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;