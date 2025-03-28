const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectMongoDB = require('./init/mongodb');
const todoRoute = require('./routes/todo');

// load environment variables
dotenv.config();

// init app
const app = express();

// connect to mongodb
connectMongoDB();

// middleware
app.set('view engine', 'ejs'); // view engine 
app.use(express.static(path.join(__dirname, 'public'))); // set public folder
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use('/', todoRoute);

module.exports = app;