const AsciiBar = require('ascii-bar').default;

module.exports = function(min, max, data) {
    console.log("processing frequencies...");
    const bar = new AsciiBar({
        undoneSymbol: "-",
        doneSymbol: ">",
        width: 60,
        formatString: '#count #bar',
        total: data.length,
        autoStop : false,
        stream: process.stdout,
    });

    /*var min = Math.min(data);
    var max = Math.max(data);*/

    /*
            L1 -> L2 -> L3 -> L4 -> L5 -> L6 -> 0 <- L7 <- L8 <- L9 <- L10 <- L11 <- L12
                                         MAX -> 0 <- MIN
    */

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

    data.forEach( sample => {
        let i = 0;

        if(sample < 0){

        }
        if(sample > 0){

        }
        if(sample === 0) {output.push('0')}

        i++;
        bar.update(i);
    });
    return output
}