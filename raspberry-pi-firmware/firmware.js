var Gpio = require('onoff').Gpio;
var fs = require('fs');
var sleep = require('sleep');

const args = process.argv.slice(2);
if(args[0] === undefined){console.error('\x1b[31m%s\x1b[0m',"ERROR: Input file path not provided");process.exit(9);}
else{var file = args[0];};

console.log('\x1b[32m%s\x1b[0m',"                                               _____                                             ");
console.log('\x1b[32m%s\x1b[0m',"   ____ ___  ___  ____  ____  ___  _____      / __(_)________ ___ _      ______ _________        ");
console.log('\x1b[32m%s\x1b[0m',"  / __ `__ \\/ _ \\/ __ \\/ __ \\/ _ \\/ ___/_____/ /_/ / ___/ __ `__ \\ | /| / / __ `/ ___/ _ \\");
console.log('\x1b[32m%s\x1b[0m'," / / / / / /  __/ /_/ / /_/ /  __/ /  /_____/ __/ / /  / / / / / / |/ |/ / /_/ / /  /  __/       ");
console.log('\x1b[32m%s\x1b[0m',"/_/ /_/ /_/\\___/ .___/ .___/\\___/_/        /_/ /_/_/  /_/ /_/ /_/|__/|__/\\__,_/_/   \\___/    ");
console.log('\x1b[32m%s\x1b[0m',"              /_/   /_/                                                                        \n");

var input = JSON.parse(fs.readFileSync(file, "utf-8"));//read json file
var data = [];
global.delay = input.delay;

console.log("Playing: " + input.name);
console.log("\n");

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

for(var i in input.data){data.push(input.data[i]);}//json file >> array

console.log(delay);
delay = delay - 1;

for (var i in data) {
    if(data[i] == "A"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "B"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "C"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "D"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "E"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "F"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "G"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "H"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "I"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "J"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "K"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "L"){M12.writeSync(1); sleep.msleep(delay); M12.writeSync(0); sleep.msleep(delay);}
    if(data[i] == "M"){sleep.msleep(2*delay)}
}
console.log("\n Done in "+ process.uptime() + "\n");
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