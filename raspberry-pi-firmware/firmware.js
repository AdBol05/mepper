var Gpio = require('onoff').Gpio;
var fs = require('fs');
var sleep = require('sleep');
var { usleep } = require('usleep');

//notes definition
let oct = 5;
let coun;
let del;
let tempo = 120;
//let use = 180;
let ntm = 0;

const args = process.argv.slice(2);//get process arguments
if(args[0] === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided");process.exit(9);}
else{var file = args[0];};//set file input to first argument

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"                                               _____                                             ");
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      / __(_)________ ___ _      ______ _________        ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/_____/ /_/ / ___/ __ `__ \\ | /| / / __ `/ ___/ _ \\");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /  /_____/ __/ / /  / / / / / / |/ |/ / /_/ / /  /  __/       ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/        /_/ /_/_/  /_/ /_/ /_/|__/|__/\\__,_/_/   \\___/    ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                                                                        \n");

var input = JSON.parse(fs.readFileSync(file, "utf-8"));//read json file
var sequence = [];
var timing = [];
var pause = [];
//global.delay = input.delay;//set delay from JOSN file to global variable
global.direction = input.direction;

async function pa(durp){
    let ker = Math.floor(durp/100)*tempo
    ker = ker.toFixed();
    sleep.msleep(ker);
}

async function note(num, dur){
    del = (num*oct)/10;
    coun = Math.floor((dur*5*tempo)/del);
    //console.log("delay: " + del + " count: " + coun);
    for(let i = 0; i < coun; i++){
        M1.writeSync(1)
        usleep(del);
        M1.writeSync(0)
        usleep(del);
    }
}

//print basic info (mostly for debugging)
console.log("==================");
console.log("Playing: " + input.name);
//console.log("Delay: " + delay);
console.log("Direction: " + direction);
console.log("==================");
console.log("\n");

//set output pins
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

var dir = new Gpio(26, 'out');//set direction output pin
dir.writeSync(direction);//set direction based on input file

//json file >> arrays
for(let i in input.sequence){sequence.push(input.sequence[i]);}
for(let i in input.timing){timing.push(input.timing[i]);};
for(let i in input.pause){pause.push(input.pause[i]);}

for(let i in sequence) {//pin output logic
    if(sequence[i] === "c")     {ntm = 1912;}
    if(sequence[i] === "cf")    {ntm = 1805;}
    if(sequence[i] === "d")     {ntm = 1703;}
    if(sequence[i] === "df")    {ntm = 1607;}
    if(sequence[i] === "e")     {ntm = 1517;}
    if(sequence[i] === "f")     {ntm = 1431;}
    if(sequence[i] === "ff")    {ntm = 1351;}
    if(sequence[i] === "g")     {ntm = 1275;}
    if(sequence[i] === "gf")    {ntm = 1203;}
    if(sequence[i] === "a")     {ntm = 1136;}
    if(sequence[i] === "af")    {ntm = 1072;}
    if(sequence[i] === "b")     {ntm = 1012;}
    if(sequence[i] === "c1")    {ntm = 956;}
    if(sequence[i] === "cf1")   {ntm = 902;}
    if(sequence[i] === "d1")    {ntm = 851;}
    if(sequence[i] === "df1")   {ntm = 803;}
    if(sequence[i] === "e1")    {ntm = 758;}
    if(sequence[i] === "f1")    {ntm = 715;}
    if(sequence[i] === "ff1")   {ntm = 675;}
    if(sequence[i] === "g1")    {ntm = 637;}
    if(sequence[i] === "gf1")   {ntm = 601;}
    if(sequence[i] === "a1")    {ntm = 568;}
    if(sequence[i] === "af1")   {ntm = 536;}
    if(sequence[i] === "b1")    {ntm = 506;}
    if(sequence[i] === "e0")    {ntm = 3034;}
    if(sequence[i] === "g0")    {ntm = 2550;}
    if(sequence[i] === "b0")    {ntm = 2024;}
    if(sequence[i] === "af0")   {ntm = 2144;}
    if(sequence[i] === "a0")    {ntm = 2272;}
    if(sequence[i] === "f0")    {ntm = 2862;}

    //console.log("ntm: " + ntm + " timing: " + timing[i]);
    note(ntm, timing[i]);
    if(pause[i] !== 0){if(pause[i] !== undefined){pa(pause[i]); /*console.log("pause: " + pause[i]);*/}}
    /*
    if(data[i] == "A"){M1.writeSync(1); sleep.msleep(delay); M1.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "B"){M2.writeSync(1); sleep.msleep(delay); M2.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "C"){M3.writeSync(1); sleep.msleep(delay); M3.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "D"){M4.writeSync(1); sleep.msleep(delay); M4.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "E"){M5.writeSync(1); sleep.msleep(delay); M5.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "F"){M6.writeSync(1); sleep.msleep(delay); M6.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "G"){M7.writeSync(1); sleep.msleep(delay); M7.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "H"){M8.writeSync(1); sleep.msleep(delay); M8.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "I"){M9.writeSync(1); sleep.msleep(delay); M9.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "J"){M10.writeSync(1); sleep.msleep(delay); M10.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "K"){M11.writeSync(1); sleep.msleep(delay); M11.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "L"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "M"){sleep.msleep(2*delay)}
*/
}
console.log("\n Done in "+ process.uptime() + "\n");

//disconnect GPIOs from script
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