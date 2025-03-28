const express = require('express');

const app = express();

app.set('view engine', 'ejs'); // Set the view engine to ejs

app.get('/example', (req, res) => {
  res.render('pages/home.ejs', { title: 'Express' }); // Render method to render the view
  // The first argument is the view file name, and the second argument is the data to be passed to the view
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});