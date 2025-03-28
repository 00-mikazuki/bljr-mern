const fs = require('fs');

// Synchronous
// fs.writeFileSync('hello.txt', 'Hello from Node.js!');
// fs.appendFileSync('hello.txt', ' Hello again from fs.js!');
// let data = fs.readFileSync('./hello.txt', { encoding: 'utf-8' });
// console.log(data);
// fs.unlinkSync('./hello.txt');

// Asynchronous
// fs.writeFile('hello.txt', 'Hi from Node.js!', (err) => {
//   if (err) throw err;
//   console.log('File created!');
// });

// fs.appendFile('hello.txt', ' Hi again from Node.js!', (err) => {
//   if (err) throw err;
//   console.log('File updated!');
// });

// fs.readFile('hello.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// fs.unlink('hello.txt', (err) => {
//   if (err) throw err;
//   console.log('File deleted!');
// })

// console.log('this is synchronous code');
