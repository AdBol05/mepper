module.exports = async ({ num, dur, m, dual }) => {

    return await new Promise(async resolve => {
        const note = require('./note.js');

        console.log("exec");

        resolve(await note(num, dur, m, dual))
    })


};