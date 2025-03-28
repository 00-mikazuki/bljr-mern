const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/users', (req, res) => {
  res.send(req.query);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});