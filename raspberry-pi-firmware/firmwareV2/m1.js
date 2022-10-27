const { Worker, isMainThread, MessageChannel, MessagePort, parentPort } = require("worker_threads");

module.exports = ({num, dur}) => {
    let Gpio = require('onoff').Gpio;
    let sleep = require('sleep');

    let M = new Gpio(14, 'out');

    let oct = 5;
    let coun;
    let del;
    let tempo = 120;

    parentPort.on("message", (value) => {
        value.replyPort.postMessage("AAAA");
    });

    del = (num * oct);
        coun = Math.floor((dur * 5 * tempo) / del);
        for (let i = 0; i < coun; i++) {
            M.writeSync(1);
            sleep.usleep(del);
            M.writeSync(0);
            sleep.usleep(del);
        }
    M.unexport();
    return "ntm: " + num + " motor: 1 timing: " + dur;

}