const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.get('/example', (req, res) => {
  console.log(req.hostname);
  console.log(req.ip);
  console.log(req.method);
  console.log(req.protocol);
  console.log(req.secure);
  console.log(req.accepts()); // Returns an array of accepted content types
  console.log(req.get('Content-Type')); // Returns the value of the specified header
  res.send('Example route');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});