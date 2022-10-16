module.exports = ({ num, dur, m, dual }) => {
    var note = require('./note.js');
    let out = note(num, dur, m, dual).then((out) => {
        //return out;
        Promise.resolve(out);
    });
    //console.log("ntm: " + num + " motor: " + m + " timing: " + dur);
    //Promise.resolve(out);
    
};