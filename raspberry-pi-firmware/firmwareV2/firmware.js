const fs = require('fs');
const AsciiBar = require('ascii-bar').default;
const Gpio = require('onoff').Gpio;
let sleep = require('sleep');
const translate = require('./translate.js');
//let util = require('util');

const args = process.argv.slice(2);//get process arguments
let file;
let debug = false;

if(args[0] === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided");process.exit(9);}
else{file = args[0];};//set file input to first argument

if(args[1] === "debug"){debug = true;}//log info when debug option is specified

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"                                               _____");
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      / __(_)________ ___ _      ______ _________");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/_____/ /_/ / ___/ __ `__ \\ | /| / / __ `/ ___/ _ \\");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /  /_____/ __/ / /  / / / / / / |/ |/ / /_/ / /  /  __/");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/        /_/ /_/_/  /_/ /_/ /_/|__/|__/\\__,_/_/   \\___/");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/\n");

if(debug){console.log('\x1b[31m%s\x1b[0m',"__--DEBUGGING MODE ENABLED--__\n");}

let input = JSON.parse(fs.readFileSync(file));//read and parse input file

let dir = new Gpio(26, 'out');//set direction output pin
dir.writeSync(input.direction);//set direction based on input file

let data = translate(input, debug);//translate notes into motor sequence (translate.js)

//motor setup progress bar
let bar = new AsciiBar({
    undoneSymbol: "-",
    doneSymbol: "#",
    width: 12,
    formatString: '#bar #count',
    autoStop : false,
    stream: process.stdout,
    total: 12,
});

//set up all motors
console.log("\nSetting up motors...");
global.M = {};
let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];
for(let i = 0; i < 12; i++){
    M[i] = new Gpio(pinout[i], 'out');
    bar.update(i + 1); //! has a large delay -> cannot be used for sequence progress bar
}

console.log("\n\nPlaying: " + input.name);

//control motors based on sequence recieved from translate.js
for(let i in data.action){
    if(debug){console.log("motor:" + data.motor[i] + " action:" + data.action[i] + " delay:" + data.delay[i]);}
    if(data.motor[i] !== undefined && data.action[i] !== undefined && data.delay[i] !== NaN){
        let m = data.motor[i];
        let n = data.motor[i] + 1;
        if(n > 11){n = n - 11;}
        M[m].writeSync(data.action[i]);
        if(!data.dual)M[n].writeSync(data.action[i]);
        sleep.usleep(data.delay[i]);
    }
}

dir.unexport();//disconnect all motors from process
for(let i = 0; i < 12; i++){M[i].unexport();}

console.log("\n#-----------------------------------------------------------------------------------------#");
console.log('\x1b[32m%s\x1b[0m',"\n Done in "+ process.uptime().toFixed(2) + "s"+ "                                                                By AdBol05 \n");
console.log("#-----------------------------------------------------------------------------------------#");