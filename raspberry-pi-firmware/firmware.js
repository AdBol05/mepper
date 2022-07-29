var Gpio = require('onoff').Gpio;
var fs = require('fs');
var AsciiBar = require('ascii-bar').default;

const args = process.argv.slice(2);
if(args[0] === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided");process.exit(9);}
else{var file = args[0];};

var pause = 100;

console.log('\x1b[32m%s\x1b[0m',"                                         _____                                            ");
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ___  _____      / __(_)________ ___ _      ______ _________       ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ _ \\/ ___/_____/ /_/ / ___/ __ `__ \\ | /| / / __ `/ ___/ _ \\");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ /  __/ /  /_____/ __/ / /  / / / / / / |/ |/ / /_/ / /  /  __/      ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/\\___/_/        /_/ /_/_/  /_/ /_/ /_/|__/|__/\\__,_/_/   \\___/   ");
console.log('\x1b[32m%s\x1b[0m',"             /_/                                                                        \n");


var input = JSON.parse(fs.readFileSync(file, "utf-8"));//read json file
var data = [];

var M1 = new Gpio(14, 'out');
var M2 = new Gpio(15, 'out');
var M3 = new Gpio(18, 'out');
var M4 = new Gpio(23, 'out');
var M5 = new Gpio(24, 'out');
var M6 = new Gpio(25, 'out');
var M7 = new Gpio(8, 'out');
var M8 = new Gpio(7, 'out');
var M9 = new Gpio(1, 'out');
var M10 = new Gpio(12, 'out');
var M11 = new Gpio(16, 'out');
var M12 = new Gpio(20, 'out');

for(var i in input){data.push(input[i]);}//json file >> array

const bar = new AsciiBar({//ascii loading bar setup
    undoneSymbol: "-",
    doneSymbol: ">",
    width: 60,
    formatString: '#count #bar #message',
    total: data.length,
    autoStop : false,
    lastUpdateForTiming: false,
    hideCursor: false,
    stream: process.stdout,
});

function delay(time) {//"sleep" function
    return new Promise(resolve => setTimeout(resolve, time));
}

async function run(data, pause) {
    for (var i in data) {
        bar.update(i, data[i]);
        if(data[i] == "A"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "B"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "C"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "D"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "E"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "F"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "G"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "H"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "I"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "J"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "K"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "L"){M12.writeSync(1); await delay(pause); M12.writeSync(0); await delay(pause);}
        if(data[i] == "M"){await delay(2*pause)}
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
}

run(data, pause);