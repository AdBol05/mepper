module.exports = ({ num, dur, m, dual }) => {
    const note = require('./note.js');

    note(num, dur, m, dual).then(d => {
        return d;
    });

};