module.exports = async ({ num, dur, m, dual }) => {
        let M = {};
        let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];
        
        let oct = 5;
        let coun;
        let del;
        let tempo = 120;
    
        let n = m + 1;
        if(n > 12){n = n - 12;}

        var note = require('./note.js');
        note(num, dur, m, false);

        let output = [];
        output.push(num);
        output.push(dur);
        output.push(m);
        output.push(dual);
        //console.log(output);
               
        //Promise.resolve(output);
        return output;
        //why doesn't it self-register?
    };