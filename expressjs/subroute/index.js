const express = require('express');

const app = express();

const admin = express.Router();
const user = express.Router();

app.use('/admin', admin);
app.use('/user', user);

admin.get('/', (req, res) => {
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.path);
  res.send('Admin Homepage');
});

user.get('/', (req, res) => {
  console.log(req.baseUrl);
  console.log(req.originalUrl);
  console.log(req.path);
  res.send('User Homepage');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});