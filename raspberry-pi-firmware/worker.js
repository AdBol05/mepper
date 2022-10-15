module.exports = async ({ num, dur, m, dual }) => {
    var note = require('./note.js');
    note(num, dur, m, dual).then((out) => {
        return out;
    });
    //console.log("ntm: " + num + " motor: " + m + " timing: " + dur);
    
};