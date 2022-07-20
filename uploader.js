var fs = require('fs');
var SerialPort = require("serialport").SerialPort;

var data = [];

const args = process.argv.slice(2);

let file = args[0];
let port = args[1];
let speed = 9600;
if (args[2] !== undefined) {speed = args[2];}

var input = JSON.parse(fs.readFileSync(file, "utf-8"));

var sp = new SerialPort(port, {//serial communication setup
    baudRate: speed
  });

for(var i in input)//json file >> array
    data.push(input[i]);
let length = data.length;

for (var i in data) {//send one step at a time
    //console.log(data[i]);
    sp.write(data[i], function(err) {
        if (err) {return console.log("Error on write: ", err.message);}
        console.log("Sent step " + i + " of " + length);
    });
}
