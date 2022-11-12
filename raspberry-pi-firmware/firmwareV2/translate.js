module.exports = (input) => {

    const AsciiBar = require('ascii-bar').default;
    let util = require('util');

    let tempo = 120;
    let oct = 5;

    const notemap = new Map();//map nota values and motor numbers
    notemap.set("cf", { ntm: 1805, m: 1 });
    notemap.set("df", { ntm: 1607, m: 2 });
    notemap.set("ff", { ntm: 1351, m: 3 });
    notemap.set("gf", { ntm: 1203, m: 4 });
    notemap.set("af", { ntm: 1072, m: 5 });

    notemap.set("cf1", { ntm: 902, m: 6 });
    notemap.set("df1", { ntm: 803, m: 7 });
    notemap.set("ff1", { ntm: 675, m: 8 });
    notemap.set("gf1", { ntm: 601, m: 9 });
    notemap.set("af1", { ntm: 536, m: 10 });

    notemap.set("c0", { ntm: 3823, m: 1 });
    notemap.set("d0", { ntm: 3214, m: 2 });
    notemap.set("e0", { ntm: 3034, m: 3 });
    notemap.set("f0", { ntm: 2834, m: 4 });
    notemap.set("g0", { ntm: 2550, m: 5 });
    notemap.set("a0", { ntm: 2273, m: 6 });
    notemap.set("b0", { ntm: 2024, m: 7 });

    notemap.set("c", { ntm: 1912, m: 8 });
    notemap.set("d", { ntm: 1703, m: 9 });
    notemap.set("e", { ntm: 1517, m: 10 });
    notemap.set("f", { ntm: 1431, m: 11 });
    notemap.set("g", { ntm: 1276, m: 12 });
    notemap.set("a", { ntm: 1136, m: 1 });
    notemap.set("b", { ntm: 1012, m: 2 });

    notemap.set("c1", { ntm: 956, m: 3 });
    notemap.set("d1", { ntm: 851, m: 4 });
    notemap.set("e1", { ntm: 758, m: 5 });
    notemap.set("f1", { ntm: 715, m: 6 });
    notemap.set("g1", { ntm: 637, m: 7 });
    notemap.set("a1", { ntm: 568, m: 8 });
    notemap.set("b1", { ntm: 506, m: 9 });

    notemap.set("c2", { ntm: 478, m: 10 });
    notemap.set("d2", { ntm: 426, m: 11 });
    notemap.set("e2", { ntm: 379, m: 12 });
    notemap.set("f2", { ntm: 358, m: 1 });
    notemap.set("g2", { ntm: 319, m: 2 });
    notemap.set("a2", { ntm: 284, m: 3 });
    notemap.set("b2", { ntm: 253, m: 4 });

    notemap.set("af0", { ntm: 2144, m: 5 });
    //!ntm = 1000000/note_freq/2

    console.log("Processing input...");

    let data = {//some starting data -> just turn all motors off
        "motor": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //look, I know it's stupid and not very efficient but it will probably work in the end
        "action": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "delay": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "dual": false
    };

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
        //convert notes to usable format
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
                        del = del + delay[h];           //* delay adder (probably useless in the future)
                        console.log(seq[h].motor[j] + " " + seq[h].action[j] + " " + seq[h].timestamp[j]);
                    }
                }
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
            timestamps[timestamps.length] = timestamps[timestamps.length] + (input.pause[i] * 1000);

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

            //TODO resolve delays from timestamps

            //resolve delays from timestamps and convert arrays to output object
            for(n in nested[0]){
                data.motor.push(nested[2][n]);
                data.action.push(nested[1][n]);
                if(n > 0){data.delay.push(Math.abs(nested[0][n - 1] - nested[0][n]));}
                else{data.delay.push(0);}
            }
            
            console.log("\n-----------------------------------------");
            let sum = seq[0].motor.lenght + seq[1].motor.lenght + seq[2].motor.lenght;
            console.log(sum + " " + data.motor.lenght);
            console.log("\n-----------------------------------------");
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
                    else { data.delay.push(delay); }
                }
            }
        }
        bar.update(Number(i) + 1);
    }

    //*------------------------------------------------------------------------------------*//
    console.log("\n" + util.inspect(data, { colors: true }));
    return data;
};