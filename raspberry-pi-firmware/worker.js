const { Worker, isMainThread, MessageChannel, MessagePort, parentPort } = require("worker_threads");


parentPort.on("message", (value) => {

    console.log(value);
    parentPort.postMessage("AAAAAAAAA")

})

console.log("debug");

const note = require('./note.js');
note(num, dur, m, dual);
Promise.resolve(num);