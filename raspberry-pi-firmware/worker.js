module.exports = async ({ num, dur, m, dual }) => {
        var note = require('./note.js');
        note(num, dur, m, false);

        return "played note: " + num;
    };