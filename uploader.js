var fs = require('fs');
var SerialPort = require("serialport").SerialPort;
const AsciiBar = require('ascii-bar').default;

var data = [];

const args = process.argv.slice(2);

let file = args[0];//input filename
let port = args[1];//port number
let speed = 9600;//baud rate
if (args[2] !== undefined) {speed = args[2];}//set custom baud rate if provided

var input = JSON.parse(fs.readFileSync(file, "utf-8"));//read json file

//welcome screen
console.log('\x1b[32m%s\x1b[0m',"                                                           __                __                 ");
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      __  ______  / /___  ____ _____/ /__  _____        ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/_____/ / / / __ \\/ / __ \\/ __ `/ __  / _ \\/ ___/");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /  /_____/ /_/ / /_/ / / /_/ / /_/ / /_/ /  __/ /            ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/         \\__,_/ .___/_/\\____/\\__,_/\\__,_/\\___/_/      ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                         /_/                                             ");

//input check
if(file === undefined || port === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: input filename or port not provided"); process.exit(9);}

var sp = new SerialPort(port, {//serial communication setup
    baudRate: speed
  });

for(var i in input){data.push(input[i]);}//json file >> array
let length = data.length;

const bar = new AsciiBar({//ascii loading bar setup
    undoneSymbol: "-",
    doneSymbol: ">",
    width: 60,
    formatString: '#count #bar #message',
    total: length,
    autoStop : false,
    lastUpdateForTiming: false,
    hideCursor: false,
    stream: process.stdout,
});

for (var i in data) {//send one step at a time
    sp.write(data[i], function(err) {
        if (err) {return console.log("Error on write #" + i + ":" + err.message);}
        //console.log("Sent step " + i + " of " + length);
        bar.update(i, data[i]);
    });
}
