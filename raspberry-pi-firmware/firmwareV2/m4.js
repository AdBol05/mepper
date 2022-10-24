module.exports = ({num, dur}) => {
    let Gpio = require('onoff').Gpio;
    let sleep = require('sleep');

    let M = new Gpio(23, 'out');

    let oct = 5;
    let coun;
    let del;
    let tempo = 120;

    del = (num * oct);
        coun = Math.floor((dur * 5 * tempo) / del);
        for (let i = 0; i < coun; i++) {
            M[m].writeSync(1);
            if (dual) { M[n].writeSync(1); }
            sleep.usleep(del);
            M[m].writeSync(0);
            if (dual) { M[n].writeSync(0); }
            sleep.usleep(del);
        }
    M.unexport();
    return "ntm: " + num + " motor: " + m + " timing: " + dur;
}