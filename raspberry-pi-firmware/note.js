module.exports = async function(num, dur, m, M, dual){
    var Gpio = require('onoff').Gpio;
    var sleep = require('sleep');

    /*for(let i = 1; i <= 12; i++){
        console.log("\nInitializing motor #" + i + " on pin " + pinout[i -1] + ":");
        M[i] = new Gpio(pinout[i - 1], 'out');
        //M[i].writeSync(1);
        //sleep.msleep(100);
        //M[i].writeSync(0);
        //sleep.msleep(100);
        console.log(M[i]);
    }*/

    if(dual){
        let n = 1;
        n = m + 1;
        if(n > 12){n = n - 12;}
    }
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
}