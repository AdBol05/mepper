const path = require('path');
const Piscina = require('piscina');

const pool = new Piscina({
    filename: path.resolve(__dirname, 'note.js')
});

module.exports = function(parts, notemap, M, timing){    

    (async function() {
        let i = 0;
        //let result = await Promise.all([
            parts.forEach( part => {
                i++;
                pool.run(notemap.get(part[i]).ntm, timing, notemap.get(part[i]).m, M, false)
            })
        //]);
    });

    //TBD
    //maybe launch some child processes
    //I have to rotate two motors independently but they can rotate for the same amount of time, the speed/delay/frequency is what matters
}