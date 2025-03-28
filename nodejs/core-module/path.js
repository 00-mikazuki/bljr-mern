let path = require('path');

let myPath = "D:/pemrograman/bootcamp/udemy/js-mern/core-module.js";

let parsedPath = path.parse(myPath);
let dirname = path.dirname(myPath);
let basename = path.basename(myPath);

console.log(basename);
