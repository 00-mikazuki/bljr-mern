const http = require('http');

// create a server
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('<h1>This is the home page</h1>');
    res.write('<p>Welcome to this page</p>');
  } else if (req.url === '/about') {
    res.write('This is the about page');
  } else if (req.url === '/contact') {
    res.write('This is the contact page');
  } else {
    res.write('Page not found');
  }
  res.end();
});

// listen to a server event
server.on('connection', () => {
  console.log('New connection');
});

// listen to a port
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});