module.exports = ({ num, dur, m, dual }) => {
        var note = require('./note.js');
        let output = note(num, dur, m, dual);
        console.log("ntm: " + num + " motor: " + m + " timing: " + dur);

        return "played note: " + output;
    };