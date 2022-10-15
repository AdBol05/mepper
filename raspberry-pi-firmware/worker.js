module.exports = async ({ num, dur, m, dual }) => {
        var note = require('./note.js');
        let output = new Promise(note(num, dur, m, dual));
        //console.log("ntm: " + num + " motor: " + m + " timing: " + dur);

        return "note output: " + await output;
    };