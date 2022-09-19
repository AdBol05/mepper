var Gpio = require('onoff').Gpio;
var fs = require('fs');
var sleep = require('sleep');
var { usleep } = require('usleep');

let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];//output pinout
let m = 1; //motor number
global.M = {};//global motor object

//notes definition
let oct = 5;
let coun;
let del;
let tempo = 120;
//let use = 180; --> idk if this is really important (doesn´t seem like it)
let ntm = 0;

//note mapping to note function input and number of motor
const notemap = new Map();
notemap.set("c",  {ntm: 1912, m: 1});
notemap.set("cf", {ntm: 1805, m: 2});
notemap.set("d",  {ntm: 1703, m: 3});
notemap.set("df", {ntm: 1607, m: 4});
notemap.set("e",  {ntm: 1517, m: 5});
notemap.set("f",  {ntm: 1431, m: 6});
notemap.set("ff", {ntm: 1351, m: 7});
notemap.set("g",  {ntm: 1275, m: 8});
notemap.set("gf", {ntm: 1203, m: 9});
notemap.set("a",  {ntm: 1136, m: 10});
notemap.set("af", {ntm: 1072, m: 11});
notemap.set("b",  {ntm: 1012, m: 12});
notemap.set("c1", {ntm: 956, m: 1});
notemap.set("cf1", {ntm: 902, m: 2});
notemap.set("d1", {ntm: 851, m: 3});
notemap.set("df1", {ntm: 803, m: 4});
notemap.set("e1", {ntm: 758, m: 5});
notemap.set("f1", {ntm: 715, m: 6});
notemap.set("ff1", {ntm: 675, m: 12});
notemap.set("g1", {ntm: 637, m: 11});
notemap.set("gf1", {ntm: 601, m: 10});
notemap.set("a1", {ntm: 568, m: 9});
notemap.set("af1", {ntm: 536, m: 8});
notemap.set("b1", {ntm: 506, m: 7});
notemap.set("e0", {ntm: 3034, m: 6});
notemap.set("g0", {ntm: 2550, m: 5});
notemap.set("b0", {ntm: 2024, m: 4});
notemap.set("af0", {ntm: 2144, m: 3});
notemap.set("a0", {ntm: 2272, m: 2});
notemap.set("f0", {ntm: 2862, m: 1});

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

//read json file and create arrays for mandatory data
var input = JSON.parse(fs.readFileSync(file, "utf-8"));//read json file
var sequence = [];
var timing = [];
var pause = [];
global.direction = input.direction;

//set and test output pins
for(let i = 1; i <= 12; i++){
    console.log("\nInitializing motor #" + i + " on pin " + pinout[i -1] + ":");
    M[i] = new Gpio(pinout[i - 1], 'out');
    M[i].writeSync(1);
    sleep.msleep(100);
    M[i].writeSync(0);
    sleep.msleep(100);
    console.log(M[i]);
}

//pause function
async function pa(durp){
    let ker = Math.floor(durp/100)*tempo
    ker = ker.toFixed();
    sleep.msleep(ker);
}

//note generation function
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
console.log("\n");
console.log("==================");
console.log("Playing: " + input.name);
console.log("Direction: " + direction);
console.log("==================");
console.log(notemap);
console.log("==================");

var dir = new Gpio(26, 'out');//set direction output pin
dir.writeSync(direction);//set direction based on input file

//parse data from json file to arrays
for(let i in input.sequence){sequence.push(input.sequence[i]);}
for(let i in input.timing){timing.push(input.timing[i]);}
for(let i in input.pause){pause.push(input.pause[i]);}

for(let i in sequence) {//pin output logic
    //TODO: map input/output

    console.log("note: " + sequence[i] + " ntm: " + ntm + " timing: " + timing[i]);//debug
    note(ntm, timing[i], m);//call note function with resolved values
    if(pause[i] !== 0){if(pause[i] !== undefined){pa(pause[i]); /*console.log("pause: " + pause[i]);*/}}
}
console.log("\n Done in "+ process.uptime().toFixed(2) + "s \n");//debug

//disconnect all GPIOs from script
for(let i = 1; i <= 12; i++){
    M[i].unexport();
}
dir.unexport();