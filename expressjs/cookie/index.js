const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/getcookie', (req, res) => {
  const cookies = req.cookies;
  res.send(cookies);
});

app.get('/setcookie', (req, res) => {
  res.cookie('name', 'express');
  res.send('cookie set');
});

app.get('/clearcookie', (req, res) => {
  res.clearCookie('name');
  res.send('cookie cleared');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});