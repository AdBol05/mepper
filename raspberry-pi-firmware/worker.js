const { Worker, isMainThread, MessageChannel, MessagePort, parentPort } = require("worker_threads");

parentPort.once("message", (value) => {


    let Gpio = value.Gpio;
    let sleep = value.sleep;
    
    parentPort.postMessage("AAAAAAAAA")

    global.M = {};
    let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];
    
    let oct = 5;
    let coun;
    let del;
    let tempo = 120;

    let n = m + 1;
    if(n > 12){n = n - 12;}

    M[value.m] = new Gpio(pinout[value.m - 1], 'out');
    if(value.dual){M[n] = new Gpio(pinout[value.m], 'out');}

    console.log("ntm: " + value.num + " motor: " + value.m + " timing: " + value.dur);
    del = (value.num*oct);
    coun = Math.floor((value.dur*5*tempo)/del);
    //console.log("Coun: " + coun + " del: " + del + "\n");
    for(let i = 0; i < coun; i++){
        M[value.m].writeSync(1);
        if(value.dual){M[n].writeSync(1);}
        sleep.usleep(del);
        M[value.m].writeSync(0);
        if(value.dual){M[n].writeSync(0);}
        sleep.usleep(del);
    }

    if(value.dual){M[n].unexport();}
    M[value.m].unexport();
    //return "ntm: " + value.num + " motor: " + m + " timing: " + value.dur;
    Promise.resolve(value.num);

})