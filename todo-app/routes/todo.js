const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');

// routes
// get all todos
router.get('/', todoController.index);

// add new todo view
router.get('/add', todoController.add);

// store new todo
router.post('/add', todoController.store);

// edit todo view
router.get('/edit/:id', todoController.edit);

// update todo
router.post('/update/:id', todoController.update);

// confirm delete view
router.get('/delete/:id', todoController.confirmDelete);

// delete todo
router.post('/delete/:id', todoController.destroy);

module.exports = router;