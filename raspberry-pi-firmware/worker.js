module.exports = ({ num, dur, m, dual }) => {
    const note = require('./note.js');

    console.log("exec");

    note(num, dur, m, dual).then(d => {
        console.log("Petrolej", d);
        return d;
    });

};