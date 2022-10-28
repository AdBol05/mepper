module.exports = (input_) => {

    global.input = input_;

    let tempo = 120;
    let oct = 5;

    let pinout = [14, 15, 18, 23, 24, 25, 8, 7, 12, 16, 20, 21];
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

    //console.log(input);

    let data = {
        "pin": [],
        "action": [],
        "delay": []
    };

    let sequence = [];
    let timing = [];
    let pause = [];
    for(let i in input.sequence){sequence.push(input.sequence[i]);}
    for(let i in input.timing){timing.push(input.timing[i]);}
    for(let i in input.pause){pause.push(input.pause[i]);}



    for(let i in input.sequence){
        let sample = sequence[i]
        //console.log(input);
        //console.log(sequence);
        //console.log(timing);
        //console.log(pause);
        //console.log(i);
        console.log(sample);
        //console.log(notemap.get(sample));

        let delay = notemap.get(sequence[i]).ntm * oct;
        let count = Math.floor((timing[i] * 5 * tempo) / delay);
        let pin = pinout[notemap.get(sequence[i]).m - 1];

        for(i = 0; i < count; i++){
            data.pin.push(pin);
            data.action.push(1);
            data.delay.push((delay/count).toFixed());
            data.action.push(0);
            data.delay.push((delay/count).toFixed());
        } 
    }

    return data;
};