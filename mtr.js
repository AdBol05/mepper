var fs = require('fs');

const path = require('path');
const Piscina = require('piscina');

const pool = new Piscina({//worker pool
  filename: path.resolve(__dirname, 'worker.js')
});

module.exports = function(min, max, outFile, data, delay, name) {

    var logic = {//"waveform sections" object
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
/*
    //split input array into 12 chunks for processing (developed on 12 core CPU)
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
        ]);*/
        let output = {//output object to be written to JSON file
            "name": "",
            "delay": 0,
            "direction": 0,
            "sequence": [],
            "timing": [],
            "pause": []
        }/*
        output.data = [].concat(result[0], result[1], result[2], result[3], result[4], result[5], result[6], result[7], result[8], result[9], result[10], result[11]); //connect results from all threads
        output.name = name;//output name
        output.delay = delay.toFixed();//round delay
        console.log(output); 
        fs.writeFileSync(outFile,JSON.stringify(output), function(err){console.error(err)});//write output to json file
        let runtime = process.uptime()*1000;//get runtime in ms
        console.log('\n================================================================');
        console.log('\x1b[32m%s\x1b[0m','Done in ' + runtime.toFixed() + 'ms. Output written to ' + outFile);//ned message
        console.log('================================================================');
    })();*/

    let sequence = [];
    let timing = [];

    data.forEach( sample => {
        if(sample > 0){
            if(sample <= logic.L1 && sample > logic.L2){Lout = 'A';}
            if(sample <= logic.L2 && sample > logic.L3){Lout = 'B';}
            if(sample <= logic.L3 && sample > logic.L4){Lout = 'C';}
            if(sample <= logic.L4 && sample > logic.L5){Lout = 'D';}
            if(sample <= logic.L5 && sample > logic.L6){Lout = 'E';}
            if(sample <= logic.L6 && sample > 0){Lout = 'F';}
        }
        if(sample < 0){
            if(sample >= logic.L7 && sample < 0){Lout = 'G';}
            if(sample >= logic.L8 && sample < logic.L7){Lout = 'H';}
            if(sample >= logic.L9 && sample < logic.L8){Lout = 'I';}
            if(sample >= logic.L10 && sample < logic.L9){Lout = 'J';}
            if(sample >= logic.L11 && sample < logic.L10){Lout = 'K';}
            if(sample >= logic.L12 && sample < logic.L1){Lout = 'L';}
        }
        if(sample === 0) {Lout = 'M'}
        sequence.push(Lout);
        timing.push(500);
    });

    output.name = name;//output name
    output.delay = delay.toFixed();//round delay
    output.sequence = sequence;
    output.timing = timing;

    console.log(output);

    fs.writeFileSync(outFile,JSON.stringify(output), function(err){console.error(err)});//write output to json file
    let runtime = process.uptime()*1000;//get runtime in ms
    console.log('\n================================================================');
    console.log('\x1b[32m%s\x1b[0m','Done in ' + runtime.toFixed() + 'ms. Output written to ' + outFile);//ned message
    console.log('================================================================');
}