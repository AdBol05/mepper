var Gpio = require('onoff').Gpio;
var M1 = new Gpio(14, 'out');
var M2 = new Gpio(15, 'out');
var M3 = new Gpio(18, 'out');
var M4 = new Gpio(23, 'out');
var M5 = new Gpio(24, 'out');
var M6 = new Gpio(25, 'out');
var M7 = new Gpio(8, 'out');
var M8 = new Gpio(7, 'out');
var M9 = new Gpio(1, 'out');
var M10 = new Gpio(12, 'out');
var M11 = new Gpio(16, 'out');
var M12 = new Gpio(20, 'out');
var M1 = new Gpio(21, 'out');

var pause = 100;

function delay(time) {//"sleep" function
    return new Promise(resolve => setTimeout(resolve, time));
}

async function run(data) {
    for (var i in data) {
        bar.update(i, data[i]);
        await delay(400);//TODO: find the right timing
    }
}

run(data, pause);

