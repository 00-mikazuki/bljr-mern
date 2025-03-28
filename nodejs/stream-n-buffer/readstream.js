const fs = require('fs');

let readStream = fs.createReadStream('data.txt');

// Buffer to store the data
let content = [];

readStream.on('data', (buffer) => {
  content.push(buffer);
});

// When the stream ends, concatenate all the buffers and log the data
readStream.on('end', () => {
  let data = Buffer.concat(content);
  console.log(data.toString());
});