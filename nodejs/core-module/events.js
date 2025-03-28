const events = require('events');

const eventEmitter = new events.EventEmitter();

// register an event
eventEmitter.on('event1', (param1, param2, name) => {
  console.log(`Hello from event1`);
  console.log(`param1: ${param1}`);
  console.log(`param2: ${param2}`);
  console.log(`name: ${name}`);
})

// emit an event
eventEmitter.emit('event1', 'world', 10, 'Juan');

console.log('this is synchronous code');
