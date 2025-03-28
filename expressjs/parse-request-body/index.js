const express = require('express');

const app = express();

// Middleware to parse the request body
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/example', (req, res) => {
  res.send(req.body);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});