const os = require('os');

let typeOS = os.type();
let archOS = os.arch();
let hostnameOS = os.hostname();
let platformOS = os.platform();
let freememOS = os.freemem();
let cpuOS = os.cpus();

console.log(cpuOS);
