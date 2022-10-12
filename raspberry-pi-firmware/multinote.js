/*module.exports = function(parts, notemap, timing){

    const path = require('path');
    const Piscina = require('piscina');

    const pool = new Piscina({
        filename: path.resolve(__dirname, 'note.js')
    });

    (async function() {
        let result = await Promise.all([
            parts.forEach( part => {
                if(notemap.has(part)){
                    pool.run(notemap.get(part).ntm, timing, notemap.get(part).m, false)
                }
            });
        ]);
        console.log(result);
    });

    //TBD
    //maybe launch some child processes
    //I have to rotate two motors independently but they can rotate for the same amount of time, the speed/delay/frequency is what matters
}*/
module.exports = ({ num, dur, m, dual }) => {
    //module.exports = async function({num, dur, m, dual}){
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
    
        if(dual){M[n].unexport();}
        M[m].unexport();
        
        //return Promise.resolve();
        return 0;
    };