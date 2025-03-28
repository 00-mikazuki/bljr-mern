const moment = require('moment');
const Todo = require('../models/Todo');

// index controller
const index = async (req, res, next) => {
  try {
    res.locals.moment = moment; // add moment to locals for using in ejs
    const todos = await Todo.find().sort({ createdAt: -1 }); // sort by created_at desc
    res.render('index', {
      title: "List Todo",
      todos,
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// add controller
const add = (req, res, next) => {
  try {
    res.render('add', {
      title: "New Todo"
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// store controller
const store = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const todo = new Todo({ title, description });
    await todo.save();

    res.redirect('/');
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// edit controller
const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.render('edit', {
      title: "Edit Todo",
      todo
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// update controller
const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    todo.title = title;
    todo.description = description;

    await todo.save();
    res.redirect('/');
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// confirm delete controller
const confirmDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.render('delete', {
      title: "Delete Todo",
      todo
    });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

// destroy controller
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.redirect('/');
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  index,
  add,
  store,
  edit,
  update,
  confirmDelete,
  destroy
};