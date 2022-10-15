module.exports = async ({ num, dur, m, dual }) => {
        var note = require('./note.js');
        await note(num, dur, m, dual);

        return "played note: " + num;
    };