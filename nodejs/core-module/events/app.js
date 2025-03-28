const events = require('events');
const fs = require('fs');

const eventEmitter = new events.EventEmitter();

// register an event
eventEmitter.on('event1', (content) => {
  fs.writeFile('test.txt', content, (err) => {
    if (err) throw err;
    console.log('File created!');
  });
});

module.exports = eventEmitter;
