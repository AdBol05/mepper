const { Worker, isMainThread, MessageChannel, MessagePort, parentPort } = require("worker_threads");


parentPort.once("message", (value) => {


    parentPort.postMessage("AAAAAAAAA")

    const note = require(__dirname + '/note.js');
    note(value.num, value.dur, value.m, value.dual);

})