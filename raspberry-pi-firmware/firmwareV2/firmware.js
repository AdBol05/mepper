let Gpio = require('onoff').Gpio;
let fs = require('fs');
let sleep = require('sleep');

const {Worker, isMainThread, MessageChannel, MessagePort, parentPort,  BroadcastChannel} = require("worker_threads");
const subChannel = new MessageChannel();
//const bc = new BroadcastChannel('note');

let worker = [];
for(let i = 1; i <= 12; i++) {
    worker[i] = new Worker(__dirname +  "/m" + i + ".js");
}

let M = [];
for(let i = 1; i <= 12; i++){
    M[i - 1] = require('./m' + i + '.js');
}

let tempo = 120;

//note mapping to note function input and number of motor
//h -> b
//ntm = 1000000/freq/2
const notemap = new Map();
notemap.set("cf", {ntm: 1805, m: 1});
notemap.set("df", {ntm: 1607, m: 2});
notemap.set("ff", {ntm: 1351, m: 3});
notemap.set("gf", {ntm: 1203, m: 4});
notemap.set("af", {ntm: 1072, m: 5});

notemap.set("cf1", {ntm: 902, m: 6});
notemap.set("df1", {ntm: 803, m: 7});
notemap.set("ff1", {ntm: 675, m: 8});
notemap.set("gf1", {ntm: 601, m: 9});
notemap.set("af1", {ntm: 536, m: 10});

notemap.set("c0", {ntm: 3823, m: 1});
notemap.set("d0", {ntm: 3214, m: 2});
notemap.set("e0", {ntm: 3034, m: 3});
notemap.set("f0", {ntm: 2834, m: 4});
notemap.set("g0", {ntm: 2550, m: 5});
notemap.set("a0", {ntm: 2273, m: 6});
notemap.set("b0", {ntm: 2024, m: 7});

notemap.set("c", {ntm: 1912, m: 8});
notemap.set("d", {ntm: 1703, m: 9});
notemap.set("e", {ntm: 1517, m: 10});
notemap.set("f", {ntm: 1431, m: 11});
notemap.set("g", {ntm: 1276, m: 12});
notemap.set("a", {ntm: 1136, m: 1});
notemap.set("b", {ntm: 1012, m: 2});

notemap.set("c1", {ntm: 956, m: 3});
notemap.set("d1", {ntm: 851, m: 4});
notemap.set("e1", {ntm: 758, m: 5});
notemap.set("f1", {ntm: 715, m: 6});
notemap.set("g1", {ntm: 637, m: 7});
notemap.set("a1", {ntm: 568, m: 8});
notemap.set("b1", {ntm: 506, m: 9});

notemap.set("c2", {ntm: 478, m: 10});
notemap.set("d2", {ntm: 426, m: 11});
notemap.set("e2", {ntm: 379, m: 12});
notemap.set("f2", {ntm: 358, m: 1});
notemap.set("g2", {ntm: 319, m: 2});
notemap.set("a2", {ntm: 284, m: 3});
notemap.set("b2", {ntm: 253, m: 4});

notemap.set("af0", {ntm: 2144, m: 5});
/*
notemap.set("a0", {ntm: 2272, m: 2});
notemap.set("f0", {ntm: 2862, m: 1});
*/

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

//read json file and create arrays for mandatory data
let input = JSON.parse(fs.readFileSync(file, "utf-8"));//read json file
let sequence = [];
let timing = [];
let pause = [];
global.direction = input.direction;

//pause function
async function pa(durp){
    let ker = Math.floor(durp/100)*tempo;
    ker = ker.toFixed();
    sleep.msleep(ker);
}

//print basic info (mostly for debugging)
console.log("\n");
console.log("==============================");
console.log("Playing: " + input.name);
console.log("Direction: " + direction);
console.log("==============================");
console.log(notemap);
console.log("==============================");
console.log("output -> \n");

let dir = new Gpio(26, 'out');//set direction output pin
dir.writeSync(direction);//set direction based on input file

//parse data from json file to arrays
for(let i in input.sequence){sequence.push(input.sequence[i]);}
for(let i in input.timing){timing.push(input.timing[i]);}
for(let i in input.pause){pause.push(input.pause[i]);}

for(let i in sequence) {//pin output logic
    sequence[i] = sequence[i].replace("h", "b");
    sequence[i] = sequence[i].replace("is", "f");
    if(sequence[i].includes('+')){
        let part = sequence[i].split('+');
        if(pause[i] !== 0 && pause[i] !== undefined){pa(pause[i]);}
        if(notemap.has(part[0]) && notemap.has(part[1]) && part.length === 2){//TODO: add suppport for more than two notes
            let pool_num1 = notemap.get(part[0]).ntm;
            let pool_num2 = notemap.get(part[1]).ntm;
            let pool_m1 = notemap.get(part[0]).m;
            let pool_m2 = notemap.get(part[1]).m;
            let pool_timing = timing[i];

            /*let promise = new Promise(async function(resolve, reject){
                M[pool_m1]({num: pool_num1, dur: timing[i]});
                M[pool_m2]({num: pool_num2, dur: timing[i]});
                resolve("multinote");
            });
            console.log(promise);
            //pa(timing[i]);
            */
            worker[2].postMessage({replyport: subChannel.port2}, []);
            //worker[2].postMessage({replyport: subChannel.port3}, [subChannel.port3]);

            subChannel.port2.on("message", (value) => {
                console.log(value);
            })

            /*subChannel.port3.on("message", (value) => {
                console.log(value);
            })*/
            //bc.postMessage('test');
            //bc.onmessage = event => console.log(event.data);
        }
    }
    else{
        if(notemap.has(sequence[i])){
            console.log("note: " + sequence[i]/* + " ntm: " + notemap.get(sequence[i]).ntm + " motor: " + notemap.get(sequence[i]).m + " timing: " + timing[i]*/);//debug
            console.log(M[notemap.get(sequence[i]).m]({num: notemap.get(sequence[i]).ntm, dur: timing[i]}));
            //pa(timing[i]);
            if(pause[i] !== 0 && pause[i] !== undefined){pa(pause[i]);}
        }
    console.log("==============================");
    }

}
console.log("\n Done in "+ process.uptime().toFixed(2) + "s \n");//debug

dir.unexport();

process.exit(0);