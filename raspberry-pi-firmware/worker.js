module.exports = async ({ num, dur, m, dual }) => {
    var note = require('./note.js');
    //await note(num, dur, m, dual);
    (function() {
        note(num, dur, m, dual);
    })();

    //const promise = new Promise (note(num, dur, m, dual));
    //console.log("ntm: " + num + " motor: " + m + " timing: " + dur);
    //Promise.resolve(out);   
};