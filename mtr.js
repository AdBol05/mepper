var fs = require('fs');

const path = require('path');
const Piscina = require('piscina');

const pool = new Piscina({
  filename: path.resolve(__dirname, 'worker.js')
});

module.exports = function(min, max, outFile, data) {

var logic = {
    "L1": 0.0,
    "L2": 0.0,
    "L3": 0.0,
    "L4": 0.0,
    "L5": 0.0,
    "L6": 0.0,
    "L7": 0.0,
    "L8": 0.0,
    "L9": 0.0,
    "L10": 0.0,
    "L11": 0.0,
    "L12": 0.0
}

//resolve waveform sections
logic.L1 = max;
logic.L2 = (max/6)*5;
logic.L3 = (max/6)*4;
logic.L4 = (max/6)*3;
logic.L5 = (max/6)*2;
logic.L6 = max/6;
logic.L7 = min/6;
logic.L8 = (min/6)*2;
logic.L9 = (min/6)*3;
logic.L10 = (min/6)*4;
logic.L11 = (min/6)*5;
logic.L12 = min;

//split input array into 12 chunks for processing
const listIndex = Math.ceil(data.length / 12);
const arr_11 = data.splice(-listIndex);
const arr_10 = data.splice(-listIndex);
const arr_9 = data.splice(-listIndex);
const arr_8 = data.splice(-listIndex);
const arr_7 = data.splice(-listIndex);
const arr_6 = data.splice(-listIndex);
const arr_5 = data.splice(-listIndex);
const arr_4 = data.splice(-listIndex);
const arr_3 = data.splice(-listIndex);
const arr_2 = data.splice(-listIndex);
const arr_1 = data.splice(-listIndex);
const arr_0 = data;

console.log("Processing sequence...");

(async function() { //launch 12 threads
    let result = await Promise.all([
        pool.run({data: arr_0, logic: logic}),
        pool.run({data: arr_1, logic: logic}),
        pool.run({data: arr_2, logic: logic}),
        pool.run({data: arr_3, logic: logic}),
        pool.run({data: arr_4, logic: logic}),
        pool.run({data: arr_5, logic: logic}),
        pool.run({data: arr_6, logic: logic}),
        pool.run({data: arr_7, logic: logic}),
        pool.run({data: arr_8, logic: logic}),
        pool.run({data: arr_9, logic: logic}),
        pool.run({data: arr_10, logic: logic}),
        pool.run({data: arr_11, logic: logic}),
    ]);
    let output = [].concat(result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]); //connect result from all threads
    console.log(output); 
    fs.writeFileSync(outFile,JSON.stringify(output), function(err){console.error(err)});//write output to json file
    console.log('Output written to ' + outFile);
  })();
}