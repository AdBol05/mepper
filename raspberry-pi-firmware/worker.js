module.exports = ({ num, dur, m, dual }) => {
        var note = require('./note.js');
        let output = note(num, dur, m, dual);

        return "played note: " + output;
    };