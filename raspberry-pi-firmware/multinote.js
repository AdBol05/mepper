const path = require('path');
const Piscina = require('piscina');

const pool = new Piscina({
    filename: path.resolve(__dirname, 'note.js')
});

module.exports = function(parts, notemap, M, timing){

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