const { Worker, isMainThread, MessageChannel, MessagePort, parentPort } = require("worker_threads");


parentPort.on("message", (value) => {


    parentPort.postMessage("AAAAAAAAA")

})


/* const note = require('./note.js');
note(num, dur, m, dual);
Promise.resolve(num); */