module.exports = ({ num, dur, m, dual }) => {
    const note = require('./note.js');

    note(num, dur, m, dual).then(d => {
        console.log("Petrolej", d);
        return d;
    });

};