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


    data.forEach( sample => {
        let i = 0;



        i++;
        bar.update(i);
    });
}