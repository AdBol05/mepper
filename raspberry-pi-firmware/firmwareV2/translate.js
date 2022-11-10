module.exports = (input) => {

    const AsciiBar = require('ascii-bar').default;
    let util = require('util');

    let tempo = 120;
    let oct = 5;

    const notemap = new Map();
    notemap.set("cf", {ntm: 1805, m: 1});
    notemap.set("df", {ntm: 1607, m: 2});
    notemap.set("ff", {ntm: 1351, m: 3});
    notemap.set("gf", {ntm: 1203, m: 4});
    notemap.set("af", {ntm: 1072, m: 5});

    notemap.set("cf1", {ntm: 902, m: 6});
    notemap.set("df1", {ntm: 803, m: 7});
    notemap.set("ff1", {ntm: 675, m: 8});
    notemap.set("gf1", {ntm: 601, m: 9});
    notemap.set("af1", {ntm: 536, m: 10});

    notemap.set("c0", {ntm: 3823, m: 1});
    notemap.set("d0", {ntm: 3214, m: 2});
    notemap.set("e0", {ntm: 3034, m: 3});
    notemap.set("f0", {ntm: 2834, m: 4});
    notemap.set("g0", {ntm: 2550, m: 5});
    notemap.set("a0", {ntm: 2273, m: 6});
    notemap.set("b0", {ntm: 2024, m: 7});

    notemap.set("c", {ntm: 1912, m: 8});
    notemap.set("d", {ntm: 1703, m: 9});
    notemap.set("e", {ntm: 1517, m: 10});
    notemap.set("f", {ntm: 1431, m: 11});
    notemap.set("g", {ntm: 1276, m: 12});
    notemap.set("a", {ntm: 1136, m: 1});
    notemap.set("b", {ntm: 1012, m: 2});

    notemap.set("c1", {ntm: 956, m: 3});
    notemap.set("d1", {ntm: 851, m: 4});
    notemap.set("e1", {ntm: 758, m: 5});
    notemap.set("f1", {ntm: 715, m: 6});
    notemap.set("g1", {ntm: 637, m: 7});
    notemap.set("a1", {ntm: 568, m: 8});
    notemap.set("b1", {ntm: 506, m: 9});

    notemap.set("c2", {ntm: 478, m: 10});
    notemap.set("d2", {ntm: 426, m: 11});
    notemap.set("e2", {ntm: 379, m: 12});
    notemap.set("f2", {ntm: 358, m: 1});
    notemap.set("g2", {ntm: 319, m: 2});
    notemap.set("a2", {ntm: 284, m: 3});
    notemap.set("b2", {ntm: 253, m: 4});

    notemap.set("af0", {ntm: 2144, m: 5});

    console.log("Processing input...");

    function larger(a, b){
        if(a >= b){return a}
        if(b > a){return b}
    }

    function smaller(a, b){
        if(a <= b){return a}
        if(b < a){return b}
    }

    let data = {
        "motor": [],
        "action": [],
        "delay": [],
        "dual": false
    };

    let bar = new AsciiBar({
        undoneSymbol: "-",
        doneSymbol: "#",
        width: 70,
        formatString: '#bar #count',
        autoStop : false,
        stream: process.stdout,
        total: input.sequence.length,
    });

    for(let i in input.sequence){
        if(input.sequence[i].includes("+")){
            data.dual = true;

            let sample = input.sequence[i].split("+");

            let delay = [];
            delay[0] = Math.floor(notemap.get(sample[0]).ntm * oct);
            delay[1] = Math.floor(notemap.get(sample[1]).ntm * oct);

            let count = [];
            count[0] = Math.floor((input.timing[i] * 5 * tempo) / delay[0]);
            count[1] = Math.floor((input.timing[i] * 5 * tempo) / delay[1]);

            /*let smallerDelay = Math.floor(smaller(delay[0], delay[1]));
            let largerDelay = Math.floor(larger(delay[0], delay[1])).toFixed();*/

            let motor = [];
            motor[0] = notemap.get(sample[0]).m - 1;
            motor[1] = notemap.get(sample[1]).m - 1;
			
            //smallerDelay = Math.floor(smallerDelay/2);
            //largerDelay = Math.floor(largerDelay/2);
            //let deltaDelay = Math.floor(largerDelay - smallerDelay);

            let seq = [
                {
                    "motor": [],
                    "action": [],
                    "delay": [],
                    "timestamp": []
                },
                {
                    "motor": [],
                    "action": [],
                    "delay": [],
                    "timestamp": []
                },
            ]
            
            for(let h = 0; h < 2; h++){
                
                for(let j = 0; j < count[h]; j++){
                    let del = 0;
                    
                    for(let k = 0; k < 2; k++){
                        seq[h].motor.push(motor[h]);
                        seq[h].action.push(k);
                    
                        //if(j === 0){seq[h].timestamp.push(0);}
                        //else{seq[h].timestamp.push(seq[h].timestamp[j - 1] + delay[h]);}
                        seq[h].delay.push(delay[h]);
                    
                        if(j !== 0 && k !== 0){del = del + delay[h];}
                        seq[h].timestamp.push(del);
                        //console.log(del);
                    }

                }

            }

            console.log("output: " +  util.inspect(seq, {colors: true}));
            /*for(let j = 0; j < count; j++){
                //some super cool stuff... idk if this will work -> timing s fucked up
                for(let k = 0; k < 2; k++){
                    if(delay1 <= delay2){
                        data.motor.push(notemap.get(sample[0]).m - 1);
                        data.motor.push(notemap.get(sample[1]).m - 1);
                    }
                    else{
                        data.motor.push(notemap.get(sample[1]).m - 1);
                        data.motor.push(notemap.get(sample[0]).m - 1);
                    }

                    data.action.push(k);
                    data.action.push(k);//two motors!!!

                    if(j === (count - 1 && k > 0)){
                        data.delay.push(Math.floor(smallerDelay/2));
                        data.delay.push(Math.floor(deltaDelay/2) + (input.pause[i]) * 1000);
                    }
                    else{
                        data.delay.push(Math.floor(smallerDelay/2));
                        data.delay.push(Math.floor(deltaDelay/2));
                    }
                }
            }*/
        }
        else{
            let delay = Math.floor(notemap.get(input.sequence[i]).ntm * oct);
            let count = Math.floor((input.timing[i] * 5 * tempo) / delay);
            let motor = notemap.get(input.sequence[i]).m - 1;

            for(let j = 0; j < count; j++){
                for(let k = 0; k < 2; k++){
                    data.motor.push(motor);
                    data.action.push(k);
                    if(j === (count - 1 && k > 0)){data.delay.push(delay + (input.pause[i]) * 1000);}
                    else{data.delay.push(delay);}
                }
            }
        }
        bar.update(Number(i) + 1);
    }

    console.log("\n" + util.inspect(data, {colors: true}));
    return data;
};
