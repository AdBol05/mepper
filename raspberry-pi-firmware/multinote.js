const path = require('path');
const Piscina = require('piscina');
//var sleep = require('sleep');

const pool = new Piscina({
    filename: path.resolve(__dirname, 'note.js')
});

module.exports = function(parts, notemap, M, timing){

    /*for(let i = 1; i <= 12; i++){
        console.log("\nInitializing motor #" + i + " on pin " + pinout[i -1] + ":");
        M[i] = new Gpio(pinout[i - 1], 'out');
        //M[i].writeSync(1);
        sleep.msleep(100);
        //M[i].writeSync(0);
        sleep.msleep(100);
        console.log(M[i]);
    }*/

    (async function() {
        //let result = await Promise.all([
            parts.forEach( part => {
                if(notemap.has(part)){
                    pool.run(notemap.get(part).ntm, timing, notemap.get(part).m, M, false)
                }
            })
        //]);
    });

    //TBD
    //maybe launch some child processes
    //I have to rotate two motors independently but they can rotate for the same amount of time, the speed/delay/frequency is what matters
}