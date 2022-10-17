const { Worker, isMainThread, MessageChannel, MessagePort, parentPort } = require("worker_threads");

module.exports = ({ num, dur, m, dual }) => {

    parentPort.on("message", (value) => {

    value.replyPort.postMessage("AAAA");
    })

    const note = require('./note.js');
    note(num, dur, m, dual);
    Promise.resolve(num);
};