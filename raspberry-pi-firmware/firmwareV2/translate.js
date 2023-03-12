module.exports = (input, debug) => {
    
    const fs = require('fs');
    const AsciiBar = require('ascii-bar').default;
    let util = require('util');
    
    let tempo = 120;
    let oct = 5;
    
    let notemap = new Map();//map of note values and motor numbers
    let notes_raw = fs.readFileSync("./notes.csv", "utf-8").trim().split("\n").filter(element => {return element !== undefined;});
    
    console.log("Processing input...");

    //create mep of nite values form csv file
    //!ntm = 1000000/note_freq/2
    let index = 0;
    for(i in notes_raw){
        let no = notes_raw[i].split(",");
        index++;
        if (index > 12){index = 1;}
        notemap.set(no[0].trim(), {ntm: Number(no[1].trim()), m: index});
    }

    console.table(notemap);

    let data = {//some starting data -> just turn all motors off
        "motor": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //look, I know it's stupid and not very efficient but it will probably work in the end
        "action": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "delay": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "dual": false
    };

    //translation progress bar
    let bar = new AsciiBar({
        undoneSymbol: "-",
        doneSymbol: "#",
        width: 70,
        formatString: '#bar #count',
        autoStop: false,
        stream: process.stdout,
        total: input.sequence.length,
    });

    //*------------------------------------------------------------------------------------*//
    for (let i in input.sequence) {
        //convert unsupported notes
        input.sequence[i] = input.sequence[i].replace("h", "b");
        input.sequence[i] = input.sequence[i].replace("is", "f");

        if (input.sequence[i].includes("+")) {
            data.dual = true;

            let sample = input.sequence[i].split("+");

            let delay = [];
            let count = [];
            let motor = [];

            let seq = [];
            //prepare all variables
            for (j in sample) {
                delay[j] = Math.floor(notemap.get(sample[j]).ntm * oct);
                count[j] = Math.floor((input.timing[i] * 5 * tempo) / delay[j]);
                motor[j] = notemap.get(sample[j]).m - 1;
                seq.push({
                    "motor": [],
                    "action": [],
                    "delay": [],
                    "timestamp": []
                });
            }

            //get motor sequence data
            for (h in sample) {
                let del = 0;
                for (let j = 0; j < count[h]; j++) {
                    for (let k = 0; k < 2; k++) {
                        seq[h].motor.push(motor[h]);    //* motors
                        seq[h].action.push(k);          //* actions
                        seq[h].timestamp.push(del);     //* timestamps
                        del = del + delay[h];           //* delay adder
                    }
                }
            }

            if(debug){
                fs.writeFileSync("./temp_data_raw.json", JSON.stringify(seq));
                console.log("\ncounts: " + count);
            }

            let motors = [];
            let actions = [];
            let timestamps = [];
            //combine all arrays
            for (k in sample) {
                motors = motors.concat(seq[k].motor);
                actions = actions.concat(seq[k].action);
                timestamps = timestamps.concat(seq[k].timestamp);
            }
            
            //add puase after notes at the end of the sequence
            timestamps[timestamps.length - 1] = timestamps[timestamps.length - 1] + (input.pause[i] * 1000);
            
            //sort all arrays based on timestamp (the first array)
            let nested = [timestamps, actions, motors];
            let srcArr;
            nested = nested.map((arr, s) => {
                if (s === 0) {
                    srcArr = arr.slice(0);
                    arr.sort((a, b) => a - b);
                    return arr;
                }
                return arr.map((item, s) => arr[
                    srcArr.indexOf(nested[0][s])
                ]);
            })
            
            //resolve delays from timestamps and convert arrays to output object
            for(n in nested[0]){
                data.motor.push(nested[2][n]);
                data.action.push(nested[1][n]);
                if(n > 0){data.delay.push(Math.abs(nested[0][n - 1] - nested[0][n]));}
                else{data.delay.push(0);}
            }
        }

        //*------------------------------------------------------------------------------------*//

        else {
            let delay = Math.floor(notemap.get(input.sequence[i]).ntm * oct);
            let count = Math.floor((input.timing[i] * 5 * tempo) / delay);
            let motor = notemap.get(input.sequence[i]).m - 1;
            //get motor sequence data
            for (let j = 0; j < count; j++) {
                for (let k = 0; k < 2; k++) {
                    data.motor.push(motor);
                    data.action.push(k);
                    if (j === (count - 1) && k !== 0) { data.delay.push(delay + (input.pause[i]) * 1000); }
                    else { data.delay.push(delay);}
                }
            }
        }
        bar.update(Number(i) + 1);
    }

    //*------------------------------------------------------------------------------------*//
    if(debug){
        fs.writeFileSync("./temp_data.json", JSON.stringify(data));
        console.log("\n" + util.inspect(data, { colors: true }));
    }
    return data;
};