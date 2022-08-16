var sleep = require('sleep');
var Gpio = require('onoff').Gpio;

const args = process.argv.slice(2);
let count = args[0];

console.log('\x1b[32m%s\x1b[0m',"                                               __            __           ");
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      / /____  _____/ /____  _____");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/_____/ __/ _ \\/ ___/ __/ _ \\/ ___/");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /  /_____/ /_/  __(__  ) /_/  __/ /    ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         \\__/\\___/____/\\__/\\___/_/     ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                                                   \n");

if(count === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: mootor step count not provided!"); process.exit(9);}

var M1 = new Gpio(14, 'out');
var M2 = new Gpio(15, 'out');
var M3 = new Gpio(18, 'out');
var M4 = new Gpio(23, 'out');
var M5 = new Gpio(24, 'out');
var M6 = new Gpio(25, 'out');
var M7 = new Gpio(8, 'out');
var M8 = new Gpio(7, 'out');
var M9 = new Gpio(12, 'out');
var M10 = new Gpio(16, 'out');
var M11 = new Gpio(20, 'out');
var M12 = new Gpio(21, 'out');
var dir = new Gpio(26, 'out');

console.log("testing motors...");

for(let n = 0; n <= 1; n++) {
    dir.writeSync(n);
    for(let i = 0; i <= count; i++){M1.writeSync(1); sleep.msleep(delay); M1.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M2.writeSync(1); sleep.msleep(delay); M2.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M3.writeSync(1); sleep.msleep(delay); M3.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M4.writeSync(1); sleep.msleep(delay); M4.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M5.writeSync(1); sleep.msleep(delay); M5.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M6.writeSync(1); sleep.msleep(delay); M6.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M7.writeSync(1); sleep.msleep(delay); M7.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M8.writeSync(1); sleep.msleep(delay); M8.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M9.writeSync(1); sleep.msleep(delay); M9.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M10.writeSync(1); sleep.msleep(delay); M10.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M11.writeSync(1); sleep.msleep(delay); M11.writeSync(0); sleep.msleep(delay);}
    for(let i = 0; i <= count; i++){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
}

M1.unexport();
M2.unexport();
M3.unexport();
M4.unexport();
M5.unexport();
M6.unexport();
M7.unexport();
M8.unexport();
M9.unexport();
M10.unexport();
M11.unexport();
M12.unexport();
dir.unexport();

console.log("test end");