const express = require('express');

const app = express();

app.set('view engine', 'ejs'); // Set the view engine to ejs

app.get('/example', (req, res) => {
  res.format({
    'text/plain': () => {
      res.send('Hello World!');
    },
    'text/html': () => {
      res.render('pages/home.ejs', { title: 'Express' });
    },
    'application/json': () => {
      res.json({ message: 'Hello World!' });
    },
    default: () => {
      res.status(406).send('Not Acceptable'); // Send 406 status code for unsupported Accept header
    },
  }); // Format method to send different responses based on the request Accept header
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});