const fs = require('fs');
const AsciiBar = require('ascii-bar').default;
const Gpio = require('onoff').Gpio;
let sleep = require('sleep');
const translate = require('./translate.js');
let util = require('util');

const args = process.argv.slice(2);//get process arguments
let file;

if(args[0] === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided");process.exit(9);}
else{file = args[0];};//set file input to first argument

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"                                               _____                                             ");
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      / __(_)________ ___ _      ______ _________        ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/_____/ /_/ / ___/ __ `__ \\ | /| / / __ `/ ___/ _ \\");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /  /_____/ __/ / /  / / / / / / |/ |/ / /_/ / /  /  __/       ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/        /_/ /_/_/  /_/ /_/ /_/|__/|__/\\__,_/_/   \\___/    ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                                                                        \n");

let input = JSON.parse(fs.readFileSync(file));

let dir = new Gpio(26, 'out');//set direction output pin
dir.writeSync(input.direction);//set direction based on input file

let data = translate(input);

let bar = new AsciiBar({
    undoneSymbol: "-",
    doneSymbol: "#",
    width: 70,
    formatString: '#bar #count',
    autoStop : false,
    stream: process.stdout,
    total: data.action.length - 1,
});

let bar_ = new AsciiBar({
    undoneSymbol: "-",
    doneSymbol: "#",
    width: 12,
    formatString: '#bar #count',
    autoStop : false,
    stream: process.stdout,
    total: 12,
});

console.log("Setting up motors...");
global.M = {};
let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];
for(let i = 0; i < 12; i++){
    M[i] = new Gpio(pinout[i], 'out');
    bar_.update(i);
}

//console.log("\n" + util.inspect(data, showHidden=false, depth=3, colors=true));

console.log("\nPLaying: " + input.name);
for(let i in data.action){
    M[data.motor[i] - 1].writeSync(data.action[i]);
    bar.update(i);
    sleep.usleep(data.delay[i]);
}

dir.unexport();
for(let i = 0; i < 12; i++){M[i].unexport();}

console.log('\x1b[32m%s\x1b[0m',"\n \n Done in "+ process.uptime().toFixed(2) + "s \n");