module.exports = async function(num, dur, m, /*M,*/ dual){
    global.M = {};
    let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];
    
    let oct = 5;
    let coun;
    let del;
    let tempo = 120;

    let n = m + 1;
    if(n > 12){n = n - 12;}

    var Gpio = require('onoff').Gpio;
    var sleep = require('sleep');

    M[m] = new Gpio(pinout[m - 1], 'out');
    if(dual){M[n] = new Gpio(pinout[m], 'out');}

    console.log("ntm: " + num + " motor: " + M + " timing: " + dur);//debug


    /*for(let i = 1; i <= 12; i++){
        console.log("\nInitializing motor #" + i + " on pin " + pinout[i -1] + ":");
        M[i] = new Gpio(pinout[i - 1], 'out');
        //M[i].writeSync(1);
        //sleep.msleep(100);
        //M[i].writeSync(0);
        //sleep.msleep(100);
        console.log(M[i]);
    }*/

    del = (num*oct); // /10
    coun = Math.floor((dur*5*tempo)/del);
    console.log("Coun: " + coun + " del: " + del + "\n");
    for(let i = 0; i < coun; i++){
        M[m].writeSync(1);
        if(dual){M[n].writeSync(1);}
        sleep.usleep(del);
        M[m].writeSync(0);
        if(dual){M[n].writeSync(0);}
        sleep.usleep(del);
    }

    /*
    //disconnect all GPIOs from script
    for(let i = 1; i <= 12; i++){
        M[i].unexport();
    }
    */
   M[m].unexport();
   
}