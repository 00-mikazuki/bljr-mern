const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.get('/target', (req, res) => {
  res.send('Hello World!');
});

app.get('/redirect', (req, res) => {
  res.redirect('/target'); // Redirect response to /target path
});

app.get('/location', (req, res) => {
  res.location('/xyz'); // Set the Location header to /xyz
  res.send('Hello World!');
});

app.get('/set', (req, res) => {
  res.set('title', 'express'); // Set the title header to express
  const title = res.get('title'); // Get the title header
  res.send(`Title: ${title}`);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});