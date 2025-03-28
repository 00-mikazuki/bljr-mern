const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

app.use(express.json()); // Built-in middleware to parse JSON data
app.use(cookieParser()); // Third-party middleware to parse cookies

const middleware1 = (obj) => { // Custom middleware
  return (req, res, next) => {
    console.log('Middleware 1');
    req.name = obj.name; // Set the name property in the request object
    next();
  }
}

const middleware2 = (req, res, next) => { // Custom middleware
  console.log('Middleware 2');
  // res.send('response from middleware 2'); // Send response from the middleware
  next();
};

const middleware3 = (req, res, next) => { // Custom middleware
  // throw new Error('Error from middleware 3'); // Throw an error from the middleware
  next('Error from middleware 3'); // Pass an error to the next middleware
  // next() with no arguments will pass the request to the next middleware
  // next() with arguments will pass the arguments to the error handler middleware
}

const errorHandler = (err, req, res, next) => { // Error handler middleware
  console.log(err.message);
  res.status(500).send('Something broke!'); // Send 500 status code for internal server error
}

app.use(middleware1({ name: 'Juan' })); // app level middleware (applies to all routes)
app.use(errorHandler); // Error handler middleware

app.get('/example', middleware2, (req, res) => { // route level middleware (applies to a specific route)
  console.log(req.name);
  res.send('Hello World!');
});

app.get('/error', middleware3, (req, res) => {
  res.send('Hello World!');
});

// Assync error handling
app.get('/async-error', async (req, res, next) => {
  try {
    throw new Error('Error from async route');
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});