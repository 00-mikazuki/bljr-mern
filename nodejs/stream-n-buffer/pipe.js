const fs = require('fs');
const { buffer } = require('stream/consumers');

const readStream = fs.createReadStream('data.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);