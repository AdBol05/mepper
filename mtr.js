const AsciiBar = require('ascii-bar').default;

module.exports = function(min, max, data) {
    console.log("processing frequencies...");
    const bar = new AsciiBar({
        undoneSymbol: "-",
        doneSymbol: ">",
        width: 60,
        formatString: '#count #bar #message',
        total: data.length,
        autoStop : false,
        lastUpdateForTiming: false,
        hideCursor: false,
        stream: process.stdout,
    });


    /*
            L1 -> L2 -> L3 -> L4 -> L5 -> L6 -> 0 <- L7 <- L8 <- L9 <- L10 <- L11 <- L12
                                         MAX -> 0 <- MIN
    */

    var Lout = '';
    var L1 = max;
    var L2 = (max/6)*5;
    var L3 = (max/6)*4;
    var L4 = (max/6)*3;
    var L5 = (max/6)*2;
    var L6 = max/6;
    var L7 = min/6;
    var L8 = (min/6)*2;
    var L9 = (min/6)*3;
    var L10 = (min/6)*4;
    var L11 = (min/6)*5;
    var L12 = min;

    var output = [];

    var i = 0;
    data.forEach( sample => {

        if(sample > 0){
            if(sample <= L1 && sample > L2){Lout = '1'}
            if(sample <= L2 && sample > L3){Lout = '2'}
            if(sample <= L3 && sample > L4){Lout = '3'}
            if(sample <= L4 && sample > L5){Lout = '4'}
            if(sample <= L5 && sample > L6){Lout = '5'}
            if(sample <= L6 && sample > 0){Lout = '6'}
        }
        if(sample < 0){
            if(sample >= L7 && sample < 0){Lout = '7'}
            if(sample >= L8 && sample < L7){Lout = '8'}
            if(sample >= L9 && sample < L8){Lout = '9'}
            if(sample >= L10 && sample < L9){Lout = '10'}
            if(sample >= L11 && sample < L10){Lout = '11'}
            if(sample >= L12 && sample < L1){Lout = '12'}
        }
        if(sample === 0) {Lout = '0'}

        i++;
        output.push(Lout);
        bar.update(i, Lout);
    });
    console.log("\n");
    return output
}