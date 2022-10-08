module.exports = function(num, dur, m, M, dual){
    async function note(num, dur, m, dual){
        var Gpio = require('onoff').Gpio;
        var sleep = require('sleep');
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
}