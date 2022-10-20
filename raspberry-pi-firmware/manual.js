let Gpio = require('onoff').Gpio;
let sleep = require('sleep');

const args = process.argv.slice(2);
let num = args[0];
let dur = args[1];
let m = args[2];
let dual = args[3];

global.M = {};
let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];
let oct = 5;
let coun;
let del;
let tempo = 120;
let n = m + 1;

if (n > 12) { n = n - 12; }
M[m] = new Gpio(pinout[m - 1], 'out');
if (dual) { M[n] = new Gpio(pinout[m], 'out'); }

console.log("ntm: " + num + " motor: " + m + " timing: " + dur);
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

if (dual) { M[n].unexport(); }
M[m].unexport();    