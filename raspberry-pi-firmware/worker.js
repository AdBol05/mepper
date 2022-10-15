module.exports = async ({ num, dur, m, dual }) => {
        var note = require('./note.js');
        let output = await note(num, dur, m, dual);

        return "played note: " + output;
    };