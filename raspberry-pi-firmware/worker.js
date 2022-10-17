const { Worker, isMainThread, MessageChannel, MessagePort, parentPort } = require("worker_threads");

module.exports = ({ num, dur, m, dual }) => {

    parentPort.on("message", (value) => {
        assert (value.replyPort instanceof MessagePort);
        
        value.replyPort.postMessage("AAAA");
        value.replyPort.close();
    })

    const note = require('./note.js');
    note(num, dur, m, dual);
    Promise.resolve(num);
};