import {sleep} from 'sleep';
module.exports = ({ num, dur, m, dual }) => {
    var note = require('./note.js');
    note(num, dur, m, dual);
    /*(async function() {
        await note(num, dur, m, dual);
    })();*/

    //const promise = new Promise (note(num, dur, m, dual));
    //console.log("ntm: " + num + " motor: " + m + " timing: " + dur);
    //Promise.resolve(out);   
};