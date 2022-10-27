const fs = require('fs');
const Gpio = require('onoff').Gpio;
let sleep = require('sleep');

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

let data = JSON.parse(fs.readFileSync(file));

console.log(data);