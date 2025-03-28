const mongoose = require('mongoose');

// schema
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
}, {
  timestamps: true, // add created_at and updated_at
});

// model
const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;