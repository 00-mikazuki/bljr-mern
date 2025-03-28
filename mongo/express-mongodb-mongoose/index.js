const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const connectionString = 'mongodb://localhost:27017/school';

mongoose.connect(connectionString).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log('Error connecting to MongoDB', err);
});

const studentSchema = new mongoose.Schema({ // Create a schema
  name: String,
  age: Number,
  email: String,
  dept: String
});

const Student = mongoose.model('Student', studentSchema); // Create a model

app.get('/student', async (req, res, next) => { // Get single document
  try {
    const { email } = req.query;
    const student = await Student.findOne({ email }); // Find a document
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json({
      message: 'Student fetched successfully',
      data: student
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/student/:id', async (req, res, next) => { // Get single document by ID
  try {
    const { id } = req.params;
    const student = await Student.findById(id); // Find a document by ID
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(200).json({
      message: 'Student fetched successfully',
      data: student
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/students', async (req, res, next) => { // Get multiple documents
  try {
    const { dept } = req.query;
    const students = await Student.find(
      dept ? { dept } : {} // Find all documents if no dept is provided
    );
    res.status(200).json({
      message: 'Students fetched successfully',
      data: students
    })
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/student', async (req, res, next) => { // Add single document
  try {
    const { name, age, email, dept } = req.body;
    const student = new Student({ name, age, email, dept }); // Create a new document
    await student.save(); // Save the document to the database
    res.status(201).send('Student added successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/students', async (req, res, next) => { // Add multiple documents
  try {
    const studentsArray = req.body;
    await Student.insertMany(studentsArray); // Insert multiple documents
    res.status(201).send('Students added successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/student', async (req, res, next) => { // Update single document
  try {
    const { email, name, age, dept } = req.body;
    await Student.findOneAndUpdate({ email }, { name, age, dept }); // Update a document
    res.send('Student updated successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/student/:id', async (req, res, next) => { // Update single document by ID
  try {
    const { id } = req.params;
    const { name, age, dept } = req.body;
    // await Student.findByIdAndUpdate(id, { name, age, dept }); // Update a document by ID

    // const student = await Student.findById(id); // Find a document by ID
    const student = await Student.findOne({ _id: id }); // Find a document by ID

    if (!student) {
      return res.status(404).send('Student not found');
    }

    student.name = name;
    student.age = age;
    student.dept = dept;
    await student.save();

    res.send('Student updated successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put('/students', async (req, res, next) => { // Update multiple documents
  try {
    const { dept, age } = req.body;
    await Student.updateMany({ dept }, { age }); // Update multiple documents
    res.send('Students updated successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/student', async (req, res, next) => { // Delete single document
  try {
    const { email } = req.body
    await Student.findOneAndDelete({ email }); // Delete a document
    res.send('Student deleted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/student/:id', async (req, res, next) => { // Delete single document by ID
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id); // Delete a document by ID
    res.send('Student deleted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/students', async (req, res, next) => { // Delete multiple documents
  try {
    const { age } = req.body;
    await Student.deleteMany({ age }); // Delete multiple documents
    res.send('Students deleted successfully');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});