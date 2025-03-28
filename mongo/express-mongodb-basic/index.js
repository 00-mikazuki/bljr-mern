const express = require('express');
const mongodb = require('mongodb');

const app = express();

app.use(express.json());

const connectionString = 'mongodb://localhost:27017';

const client = new mongodb.MongoClient(connectionString);

client.connect().then(() => {
  console.log('Connected to database');
}).catch(err => {
  console.error('Error connecting to database', err);
});

const db = client.db('school'); // Database name

const students = db.collection('students'); // Collection name

app.get('/student', (req, res, next) => { // Get single document
  const { email } = req.query;
  students.findOne({ email }).then(student => {
    res.send(student);
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.get('/students', (req, res, next) => { // Get multiple documents
  const { age } = req.query;
  students.find(
    age ? { age: parseInt(age) } : {}
  ).toArray().then(students => {
    res.send(students);
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.post('/student', (req, res, next) => { // Add single document
  const { name, age, email, dept } = req.body;
  students.insertOne(
    { name, age, email, dept }
  ).then(result => {
    res.status(201).send('Student added successfully');
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.post('/students', (req, res, next) => { // Add multiple documents
  const studentsArray = req.body;
  students.insertMany(studentsArray).then(result => {
    res.status(201).send('Students added successfully');
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.put('/student', (req, res, next) => { // Update single document
  const { email, age } = req.body;
  students.findOneAndUpdate(
    { email }, // Filter
    { $set: { age } }, // Update
    { 
      returnDocument: 'after', // Return document after update
    } // Options
  ).then(result => {
    console.log(result);
    res.status(200).json({
      message: 'Student updated successfully',
      student: result
    });
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.put('/students', (req, res, next) => { // Update multiple documents
  const { age, dept } = req.body;
  students.updateMany(
    { age }, // Filter
    { $set: { dept } } // Update
  ).then(result => {
    res.status(200).send('Students updated successfully');
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.delete('/student', (req, res, next) => { // Delete single document
  const { email } = req.body;
  students.findOneAndDelete({ email }).then(result => {
    console.log(result);
    res.status(200).send('Student deleted successfully');
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.delete('/students', (req, res, next) => { // Delete multiple documents
  const { age } = req.body;
  students.deleteMany({ age }).then(result => {
    res.status(200).send('Students deleted successfully');
  }).catch(err => {
    res.status(500).send(err);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});