module.exports = async ({ num, dur, m, dual }) => {
    return new Promise(async resolve => {
        const note = await require('./note.js');

        resolve(await note(num, dur, m, dual));
    })


};