var Gpio = require('onoff').Gpio;
var fs = require('fs');
var sleep = require('sleep');
var { usleep } = require('usleep');

let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];//output pinout
let m = 1; //motor number
M = {};//motor object

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
global.direction = input.direction;

//set output pins
/*
for(let i = 1; i <= 12; i++){
    M[i] = new Gpio(pinout[i - 1], 'out');
    M[i].writeSync(1);
    M[i].writeSync(0);
    console.log(M[i]);
}*/

M[1] = new Gpio(14, 'out');
M[2] = new Gpio(15, 'out');
M[3] = new Gpio(18, 'out');
M[4] = new Gpio(23, 'out');
M[5] = new Gpio(24, 'out');
M[6] = new Gpio(25, 'out');
M[7] = new Gpio(8, 'out');
M[8] = new Gpio(7, 'out');
M[9] = new Gpio(12, 'out');
M[10] = new Gpio(16, 'out');
M[11] = new Gpio(20, 'out');
M[12] = new Gpio(21, 'out');
console.log(M + "\n");

async function pa(durp){
    let ker = Math.floor(durp/100)*tempo
    ker = ker.toFixed();
    sleep.msleep(ker);
}

async function note(num, dur, m){
    del = (num*oct)/10;
    coun = Math.floor((dur*5*tempo)/del);
    //console.log("delay: " + del + " count: " + coun);
    for(let i = 0; i < coun; i++){
        M[m].writeSync(1);
        usleep(del);
        M[m].writeSync(0);
        usleep(del);
    }
}

//print basic info (mostly for debugging)
console.log("==================");
console.log("Playing: " + input.name);
console.log("Direction: " + direction);
console.log("==================");
console.log("\n");

/*
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
var M12 = new Gpio(21, 'out');*/

var dir = new Gpio(26, 'out');//set direction output pin
dir.writeSync(direction);//set direction based on input file

//json file >> arrays
for(let i in input.sequence){sequence.push(input.sequence[i]);}
for(let i in input.timing){timing.push(input.timing[i]);}
for(let i in input.pause){pause.push(input.pause[i]);}

for(let i in sequence) {//pin output logic
    if(sequence[i] === "c")     {ntm = 1912;  m = 1;}
    if(sequence[i] === "cf")    {ntm = 1805;  m = 2;}
    if(sequence[i] === "d")     {ntm = 1703;  m = 3;}
    if(sequence[i] === "df")    {ntm = 1607;  m = 4;}
    if(sequence[i] === "e")     {ntm = 1517;  m = 5;}
    if(sequence[i] === "f")     {ntm = 1431;  m = 6;}
    if(sequence[i] === "ff")    {ntm = 1351;  m = 7;}
    if(sequence[i] === "g")     {ntm = 1275;  m = 8;}
    if(sequence[i] === "gf")    {ntm = 1203;  m = 9;}
    if(sequence[i] === "a")     {ntm = 1136;  m = 10;}
    if(sequence[i] === "af")    {ntm = 1072;  m = 11;}
    if(sequence[i] === "b")     {ntm = 1012;  m = 12;}
    if(sequence[i] === "c1")    {ntm = 956;   m = 1;}
    if(sequence[i] === "cf1")   {ntm = 902;   m = 2;}
    if(sequence[i] === "d1")    {ntm = 851;   m = 3;}
    if(sequence[i] === "df1")   {ntm = 803;   m = 4;}
    if(sequence[i] === "e1")    {ntm = 758;   m = 5;}
    if(sequence[i] === "f1")    {ntm = 715;   m = 6;}
    if(sequence[i] === "ff1")   {ntm = 675;   m = 12;}
    if(sequence[i] === "g1")    {ntm = 637;   m = 11;}
    if(sequence[i] === "gf1")   {ntm = 601;   m = 10;}
    if(sequence[i] === "a1")    {ntm = 568;   m = 9;}
    if(sequence[i] === "af1")   {ntm = 536;   m = 8;}
    if(sequence[i] === "b1")    {ntm = 506;   m = 7;}
    if(sequence[i] === "e0")    {ntm = 3034;  m = 6;}
    if(sequence[i] === "g0")    {ntm = 2550;  m = 5;}
    if(sequence[i] === "b0")    {ntm = 2024;  m = 4;}
    if(sequence[i] === "af0")   {ntm = 2144;  m = 3;}
    if(sequence[i] === "a0")    {ntm = 2272;  m = 2;}
    if(sequence[i] === "f0")    {ntm = 2862;  m = 1;}

    console.log("ntm: " + ntm + " timing: " + timing[i]);
    note(ntm, timing[i], m);
    if(pause[i] !== 0){if(pause[i] !== undefined){pa(pause[i]); /*console.log("pause: " + pause[i]);*/}}
}
console.log("\n Done in "+ process.uptime().toFixed(2) + "s \n");

//disconnect all GPIOs from script
for(let i = 1; i <= 12; i++){
    M[m].unexport();
}
/*
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
dir.unexport();*/